// Receives a call confirmation from the SMS notification and tries to establish a connection

const Provider = require('../models/Provider');
const Call = require('../models/Call');
const getDate = require('../modules/getDate');
const formatHTML = require('../modules/formatHTML');

const {
  NES_TWACCOUNTSID,
  NES_TWAUTHTOKEN,
  NES_SERVER,
  NES_TWNUMBER
} = process.env;

const { VoiceResponse } = require('twilio').twiml;
const tw = require('twilio')(NES_TWACCOUNTSID, NES_TWAUTHTOKEN);

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
        .send(
          formatHTML({ title: 'The call has already been answered. Thank you' })
        );
    }

    if (!provider) {
      console.error(`${getDate()} - Provider not found`);
      return res
        .status(400)
        .send(formatHTML({ title: 'Something went wrong' }));
    }

    if (confirm) {
      // Prepare twiml to call user that initiated the process
      const response = new VoiceResponse();
      response.dial(call.from);
      const twiml = response.toString();

      // Call provider and apply twiml to call user back
      tw.calls
        .create({ to: provider.phone, from: NES_TWNUMBER, twiml })
        .then(c => console.log(`${getDate()} - Establishing call`, c.sid))
        .catch(e => console.error(`${getDate()} - Error establishing call`, e));

      // Delete from database
      Call.deleteOne({ _id: req.params.id }, () => {});

      return res.status(200).send(
        formatHTML({
          title: `Thank you. If the user is still waiting we will connect you`
        })
      );
    } else {
      console.log(`${getDate()} - Asking for call confirmation`);
      return res.status(200).send(
        formatHTML({
          title: 'Listen to the message to decide if you can help',
          audio: call.recordingUrl,
          link: {
            url: `${NES_SERVER}/call/${call._id}?provider=${provider._id}&confirm=true`,
            text: `Click here to confirm the call`
          }
        })
      );
    }
  } catch (error) {
    console.error(`${getDate()} - Error establishing call: ${error.message}`);
    return res.status(500).send(
      formatHTML({
        title:
          'Connection not made. Your help is probably no longer needed. Thank you'
      })
    );
  }
};
