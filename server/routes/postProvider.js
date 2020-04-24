// Creates a Provider after a request from the front-end and sends an SMS validation

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
  let { name, lastName, phone } = req.body || {};
  if (name && lastName && phone) {
    try {
      // Create letters-only unique ID
      let _id = generateKey(12);
      while (await Provider.findOne({ _id })) {
        _id = generateKey(12);
      }

      // Add Spanish prefix if missing
      if (phone.slice(0, 3) != '+34' && phone.slice(0, 4) != '0034') {
        phone = '+34' + phone;
      }

      // Delete if already existing
      await Provider.deleteOne({ phone }).exec();

      await Provider.create({ ...req.body, _id, phone, valid: false });

      const body = `Welcome to nephews. Follow this link to confirm you account ${NEBOTS_SERVER}/provider/${_id}?action=validate`;

      // console.log(body);

      tw.messages.create({ body, from: NEBOTS_TWSMS, to: phone });
      console.log(`${getDate()} - Provider created`);
      return res.sendStatus(200);
    } catch (error) {
      console.error(`${getDate()} - Error saving Provider: ${error.message}`);
      return res.sendStatus(500);
    }
  }
  console.error(`${getDate()} - Bad form data`);
  return res.sendStatus(400);
};
