const Provider = require('../models/Provider');
const formatPhone = require('../modules/formatPhone');

require('dotenv').config();

const {
  NEBOTS_TWACCOUNTSID,
  NEBOTS_TWAUTHTOKEN,
  NEBOTS_TWFROM,
  NEBOTS_SERVER
} = process.env;

const tw = require('twilio')(NEBOTS_TWACCOUNTSID, NEBOTS_TWAUTHTOKEN);

module.exports = async (req, res) => {
  let { phone } = req.body || {};
  if (phone) {
    try {
      phone = formatPhone(phone);

      const provider = await Provider.findOne({ phone }).exec();

      if (!provider) {
        return res.sendStatus(400);
      }

      const body = `Per confirmar la baixa de nebots, segueix aquest enllaç ${NEBOTS_SERVER}/provider/${provider._id}?action=delete`;

      tw.messages.create({ body, from: NEBOTS_TWFROM, to: phone });
      return res.sendStatus(200);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(400);
};