const { VoiceResponse } = require('twilio').twiml;
const { v4: uuidv4 } = require('uuid');

const Call = require('../models/Call');
const Provider = require('../models/Provider');

require('dotenv').config();

const {
  NEBOTS_TWACCOUNTSID,
  NEBOTS_TWAUTHTOKEN,
  NEBOTS_TWFROM,
  NEBOTS_SERVER
} = process.env;

const tw = require('twilio')(NEBOTS_TWACCOUNTSID, NEBOTS_TWAUTHTOKEN);

module.exports = async (req, res) => {
  try {
    // Create letters-only unique ID
    let _id = uuidv4().replace(/[0-9\-]/g, '');
    while (_id.length < 8 || (await Call.findOne({ _id }))) {
      _id = uuidv4().replace(/[0-9\-]/g, '');
    }

    // CallSid is the call identifier on Twilio's end
    const callSid = req.body.CallSid;

    // Delete if already existing
    await Call.deleteOne({ callSid }).exec();

    await Call.create({ _id, callSid });

    // Send sms to providers

    providers = await Provider.find({ valid: true }).exec();

    for (const provider of providers) {
      const body = `Hola ${provider.name}, una persona necessita la teva ajuda. Si pots, segueix aquest enllaç per confirmar la trucada ${NEBOTS_SERVER}/call/${_id}?provider=${provider._id}`;

      tw.messages.create({ body, from: NEBOTS_TWFROM, to: provider.phone });

      //   To-Do respond 500 if one crash?
    }

    // Prepare response for Twilio
    const twiml = new VoiceResponse();
    twiml.say(
      { voice: 'alice', language: 'ca-ES', loop: 0 },
      'Gràcies per trucar a nebots. Estem buscant un voluntari que pugui donar-li un cop de mà. Si us plau, esperi.'
    );

    // Render the response as XML in reply to the webhook request
    res.type('text/xml');
    res.send(twiml.toString());
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
