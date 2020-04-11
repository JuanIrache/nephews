// Receives a call confirmation from the SMS notification and tries to establish a connection

const { VoiceResponse } = require('twilio').twiml;

const Provider = require('../models/Provider');
const Call = require('../models/Call');
const getDate = require('../modules/getDate');
const formatHTML = require('../modules/formatHTML');

const { NEBOTS_TWACCOUNTSID, NEBOTS_TWAUTHTOKEN, NEBOTS_SERVER } = process.env;

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
        .send(formatHTML('Gràcies, la trucada ja ha estat atesa'));
    }

    if (!provider) {
      console.error(`${getDate()} - Provider not found`);
      return res.status(400).send(formatHTML('Alguna cosa ha anat malament'));
    }

    if (confirm) {
      const response = new VoiceResponse();

      response.dial(provider.phone);

      tw.calls(call.callSid).update({ twiml: response.toString() });

      Call.deleteOne({ _id: req.params.id }, () => {});

      console.log(`${getDate()} - Establishing call`);

      return res
        .status(200)
        .send(
          formatHTML(
            `Gràcies. Si l'usuari segueix en línia iniciarem la connexió`
          )
        );
    } else {
      console.log(`${getDate()} - Confirming call`);
      return res.status(200).send(
        formatHTML(
          `<a style="color:#003146" href="${NEBOTS_SERVER}/call/${call._id}?provider=${provider._id}&confirm=true">
            Fes click aquí per confirmar la trucada
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
          'Connexió no establerta. Pot ser que ja no calgui la teva ajuda. Gràcies!'
        )
      );
  }
};
