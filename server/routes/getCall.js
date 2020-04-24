// Receives a call confirmation from the SMS notification and tries to establish a connection

const { VoiceResponse } = require('twilio').twiml;

const Provider = require('../models/Provider');
const Call = require('../models/Call');
const getDate = require('../modules/getDate');
const formatHTML = require('../modules/formatHTML');

const {
  NEBOTS_TWACCOUNTSID,
  NEBOTS_TWAUTHTOKEN,
  NEBOTS_SERVER,
  NEBOTS_TWPROXYNUM
} = process.env;

const tw = require('twilio')(NEBOTS_TWACCOUNTSID, NEBOTS_TWAUTHTOKEN);

module.exports = async (req, res) => {
  try {
    const confirm = req.query.confirm;
    const provider = await Provider.findOne({
      _id: req.query.provider
    }).exec();

    const call = await Call.findOne({
      _id: req.params.id
    }).exec();

    if (!call) {
      console.error(`${getDate()} - Call not found`);
      return res
        .status(200)
        .send(formatHTML('The call has already been answered. Thank you'));
    }

    if (!provider) {
      console.error(`${getDate()} - Provider not found`);
      return res.status(400).send(formatHTML('Something went wrong'));
    }

    if (confirm) {
      const response = new VoiceResponse();

      const dial = response.dial({ callerId: NEBOTS_TWPROXYNUM });
      dial.number(provider.phone);

      tw.calls(call.callSid).update({ twiml: response.toString() });

      Call.deleteOne({ _id: req.params.id }, () => {});

      console.log(`${getDate()} - Establishing call`);

      return res
        .status(200)
        .send(
          formatHTML(
            `Thank you. If the user is still waiting we will forward you the call`
          )
        );
    } else {
      console.log(`${getDate()} - Confirming call`);
      return res.status(200).send(
        formatHTML(
          `<a style="color:#003146" href="${NEBOTS_SERVER}/call/${call._id}?provider=${provider._id}&confirm=true">
            Click here to confirm the call
            </a>`
        )
      );
    }
  } catch (error) {
    console.error(`${getDate()} - Error establishing call: ${error.message}`);
    return res
      .status(500)
      .send(
        formatHTML(
          'Connection not made. Your help is probably no longer needed. Thank you'
        )
      );
  }
};
