const Provider = require('../models/Provider');
const Call = require('../models/Call');
const { VoiceResponse } = require('twilio').twiml;

const { NEBOTS_TWACCOUNTSID, NEBOTS_TWAUTHTOKEN } = process.env;

const tw = require('twilio')(NEBOTS_TWACCOUNTSID, NEBOTS_TWAUTHTOKEN);

module.exports = async (req, res) => {
  console.log('confirmcall', req.params);
  try {
    const provider = await Provider.findOne({
      _id: req.params.providerId
    }).exec();
    const call = await Call.findOne({
      _id: req.params.id,
      validateKey: req.params.key
    }).exec();
    if (!call) {
      return res
        .status(200)
        .send('<h1>Gràcies, la trucada ja ha estat atesa</h1>');
    }
    if (!provider) {
      console.error('Provider not found');
      return res.status(400).send('<h1>Alguna cosa ha anat malament</h1>');
    }

    const response = new VoiceResponse();
    response.dial(provider.phone);
    tw.calls(call.callSid).update({ twiml: response.toString() });

    Call.deleteOne({
      _id: req.params.id
    });

    return res.status(200).send('<h1>Iniciem la connexió</h1>');
  } catch (error) {
    console.error(error);
    return res.status(500).send('<h1>Alguna cosa ha anat malament</h1>');
  }
};
