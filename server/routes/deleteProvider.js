// Receives the delete Provider request and sends a confirmation SMS
const ph = require('phone');

const Provider = require('../models/Provider');
const getDate = require('../modules/getDate');

require('dotenv').config();

const {
  NES_TWACCOUNTSID,
  NES_TWAUTHTOKEN,
  NES_TWNUMBER,
  NES_SERVER
} = process.env;

const tw = require('twilio')(NES_TWACCOUNTSID, NES_TWAUTHTOKEN);

module.exports = async (req, res) => {
  let { phone } = req.body || {};
  if (phone) {
    try {
      // Validate phone number
      phone = ph(phone, country)[0];
      if (!phone) {
        console.error(`${getDate()} - Bad phone number`);
        return res.sendStatus(400);
      }

      const provider = await Provider.findOne({ phone }).exec();

      if (!provider) {
        return res.sendStatus(400);
      }

      const body = `Please follow this link to cancel your nephews account ${NES_SERVER}/provider/${provider._id}?action=delete`;

      // console.log(body);

      tw.messages.create({ body, from: NES_TWNUMBER, to: phone });
      console.log(`${getDate()} - Delete provider request`);
      return res.sendStatus(200);
    } catch (error) {
      console.error(
        `${getDate()} - Error requesting Provider delete: ${error.message}`
      );
      return res.sendStatus(500);
    }
  }
  console.error(`${getDate()} - Phone not present in body`);
  return res.sendStatus(400);
};
