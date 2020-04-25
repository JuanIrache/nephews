// Tries to interpret a transcription to filter a call and notify providers with the recorded audio

const Call = require('../models/Call');
const Provider = require('../models/Provider');
const generateKey = require('../modules/generateKey');
const getDate = require('../modules/getDate');

require('dotenv').config();

const {
  NEBOTS_TWACCOUNTSID,
  NEBOTS_TWAUTHTOKEN,
  NEBOTS_TWSMS,
  NEBOTS_SERVER
} = process.env;

const tw = require('twilio')(NEBOTS_TWACCOUNTSID, NEBOTS_TWAUTHTOKEN);

module.exports = async (req, res) => {
  const {
    TranscriptionStatus,
    TranscriptionText,
    From: from,
    RecordingUrl
  } = req.body;
  try {
    // Create letters-only unique ID
    let _id = generateKey(12);
    while (await Call.findOne({ _id })) {
      _id = generateKey(12);
    }

    // Delete if already existing
    await Call.deleteOne({ from }).exec();

    await Call.create({ _id, from });

    // Find valid providers

    const query = { valid: true };

    // To-Do, transcribe and interpret other languages
    // If transcription failed, assume non-english and skip interpretation
    if (TranscriptionStatus !== 'completed') query.languages = { $ne: 'eng' };
    else {
      query.languages = 'eng';
      // Filter skills based on transcription
      query.skills = filterSkills(TranscriptionText);
    }

    // Send sms to providers
    providers = await Provider.find(query).exec();

    for (const provider of providers) {
      const body = `Hello ${provider.name}, someone needs your help.
      
      If you are available, follow this link to respond to the call ${NEBOTS_SERVER}/call/${_id}?provider=${provider._id}
      
      CANCEL your account: ${NEBOTS_SERVER}/provider/${provider.id}?action=delete`.replace(
        / {2,}/g,
        ''
      );

      console.log(body);
      // tw.messages.create({ body, from: NEBOTS_TWSMS, to: provider.phone });
    }
  } catch (error) {
    console.error(`${getDate()} - Error saving Call: ${error.message}`);
    return res.sendStatus(500);
  }
};
