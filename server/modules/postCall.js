const { VoiceResponse } = require('twilio').twiml;
const Call = require('../models/Call');
const Provider = require('../models/Provider');

require('dotenv').config();

const {
  NEBOTS_TWACCOUNTSID,
  NEBOTS_TWAUTHTOKEN,
  NEBOTS_TWFROM,
  NEBOTS_SERVER
} = process.env;

const sms = require('twilio')(NEBOTS_TWACCOUNTSID, NEBOTS_TWAUTHTOKEN);

module.exports = async (req, res) => {
  console.log(req.body);

  try {
    // Use letters only key for better SMS link funcitonality
    // let validateKey = uuidv4().replace(/[0-9\-]/g, '');
    // while (validateKey.length < 8) {
    //   validateKey = uuidv4().replace(/[0-9\-]/g, '');
    // }

    // await Call.create({ validateKey });

    // Send sms to providers
    const body = `Nebot, una persona necessita la teva ajuda. Si pots, segueix aquest enllaç per confirmar la trucada ${NEBOTS_SERVER}/provider/`;

    //   console.log(body);

    providers = await Provider.find({}).exec();

    for (const provider of providers) {
      sms.messages.create({
        body,
        from: NEBOTS_TWFROM,
        to: provider.phone
      });
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
