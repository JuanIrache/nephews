const uid = require('uid');

const Provider = require('../models/Provider');

require('dotenv').config();

const {
  NEBOTS_TWACCOUNTSID,
  NEBOTS_TWAUTHTOKEN,
  NEBOTS_TWFROM,
  NEBOTS_SERVER
} = process.env;

const twilio = require('twilio')(NEBOTS_TWACCOUNTSID, NEBOTS_TWAUTHTOKEN);

module.exports = async (req, res) => {
  let { name, lastName, phone } = req.body || {};
  if (name && lastName && phone) {
    try {
      const validateKey = uid(12);
      if (phone.slice(0, 3) != '+34' && phone.slice(0, 4) != '0034') {
        phone = '+34' + phone;
      }
      // Delete if already existing
      await Provider.deleteOne({ phone }).exec();
      const { _id } = await Provider.create({
        name,
        lastName,
        phone,
        validateKey
      });
      twilio.messages.create({
        body: `Benvingut a nebots. Segueix aquest enllaç per confirmar el teu compte ${NEBOTS_SERVER}/provider/${_id}/validate/${validateKey}`,
        from: NEBOTS_TWFROM,
        to: phone
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }

    return res.sendStatus(200);
  }
  return res.status(400).send({
    message: 'Bad data'
  });
};
