// Tries to interpret a transcription to filter a call and notify providers with the recorded audio

const Call = require('../models/Call');
const Provider = require('../models/Provider');
const generateKey = require('../modules/generateKey');
const getDate = require('../modules/getDate');
const filterSkills = require('../modules/filterSkills');

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
    RecordingUrl: recordingUrl
  } = req.body;
  try {
    // Create letters-only unique ID
    let _id = generateKey(12);
    while (await Call.findOne({ _id })) {
      _id = generateKey(12);
    }

    // Delete if already existing
    await Call.deleteOne({ from }).exec();

    await Call.create({ _id, from, recordingUrl });

    // Find valid providers

    const query = { $and: [{ valid: true }] };

    let language, skills;
    if (TranscriptionStatus === 'completed') {
      language = 'eng';
      // Filter skills based on transcription
      skills = filterSkills(TranscriptionText);
    }

    // To-Do, transcribe and interpret other languages
    // If transcription failed, assume non-english for now
    if (skills == null) language = null;
    // Don't add nulls to query
    else query.$and.push({ $or: skills.map(s => ({ skills: s })) });

    if (language != null) query.$and.push({ languages: language });

    // Send sms to providers
    providers = await Provider.find(query).exec();

    for (const provider of providers) {
      const body = `Hello ${provider.name}, someone needs your help.
      
      If you are available, follow this link to respond to the call ${NEBOTS_SERVER}/call/${_id}?provider=${provider._id}
      
      CANCEL your account: ${NEBOTS_SERVER}/provider/${provider.id}?action=delete`.replace(
        / {2,}/g,
        ''
      );

      // console.log(body);
      tw.messages.create({ body, from: NEBOTS_TWSMS, to: provider.phone });
    }
    console.log(
      `${getDate()} - Transcription processed. Language: ${language}, Skills: ${skills}. Contacted ${providers} providers`
    );

    return res.sendStatus(200);
  } catch (error) {
    console.error(`${getDate()} - Error saving Call: ${error.message}`);
    return res.sendStatus(500);
  }
};
