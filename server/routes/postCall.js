// Handles a call when it starts, records the user question and sends the callback to the transcription code

const { VoiceResponse } = require('twilio').twiml;

const getDate = require('../modules/getDate');

require('dotenv').config();

const { NES_SERVER, NES_CLIENTURL } = process.env;

module.exports = async (req, res) => {
  try {
    if (req.body.CallStatus === 'ringing') {
      // Prepare response for Twilio
      const twiml = new VoiceResponse();
      // Play welcome message
      twiml.play(NES_CLIENTURL + '/gracies.mp3');

      // Record user question
      twiml.record({
        transcribeCallback: NES_SERVER + '/transcription',
        maxLength: 30
      });

      // Render the response as XML in reply to the webhook request
      res.type('text/xml');
      console.log(`${getDate()} - Call started`);
      return res.send(twiml.toString());
    }
    return res.sendStatus(200);
  } catch (error) {
    console.error(`${getDate()} - Error handling Call: ${error.message}`);
    return res.sendStatus(500);
  }
};
