// Tries to interpret a transcription to filter a call  and notify providers with the recorded audio

const { VoiceResponse } = require('twilio').twiml;

const Call = require('../models/Call');
const Provider = require('../models/Provider');
const getDate = require('../modules/getDate');

require('dotenv').config();

const {
  NEBOTS_TWACCOUNTSID,
  NEBOTS_TWAUTHTOKEN,
  NEBOTS_TWSMS,
  NEBOTS_SERVER,
  NEBOTS_CLIENTURL
} = process.env;

const tw = require('twilio')(NEBOTS_TWACCOUNTSID, NEBOTS_TWAUTHTOKEN);

module.exports = async (req, res) => {
  try {
    console.log(req.body);
    const {
      TranscriptionText,
      TranscriptionStatus,
      RecordingUrl,
      CallSid
    } = req.body;
    console.log(TranscriptionText, TranscriptionStatus, RecordingUrl, CallSid);
  } catch (error) {
    console.error(`${getDate()} - Error saving Call: ${error.message}`);
    return res.sendStatus(500);
  }
};
