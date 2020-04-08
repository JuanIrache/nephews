const { v4: uuidv4 } = require('uuid');

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
      // Use letters only key for better SMS link funcitonality
      let validateKey = uuidv4().replace(/[0-9\-]/g, '');
      while (validateKey.length < 8) {
        validateKey = uuidv4().replace(/[0-9\-]/g, '');
      }

      // Create letters-only unique ID
      let _id = uuidv4().replace(/[0-9\-]/g, '');
      while (validateKey.length < 8 || (await Provider.findOne({ _id }))) {
        _id = uuidv4().replace(/[0-9\-]/g, '');
      }

      // Add Spanish prefix if missing
      if (phone.slice(0, 3) != '+34' && phone.slice(0, 4) != '0034') {
        phone = '+34' + phone;
      }

      // Delete if already existing
      await Provider.deleteOne({ phone }).exec();

      await Provider.create({
        _id,
        name,
        lastName,
        phone,
        validateKey
      });

      const body = `Benvingut a nebots. Segueix aquest enllaç per confirmar el teu compte ${NEBOTS_SERVER}/provider/${_id}/validate/${validateKey}`;

      //   console.log(body);

      twilio.messages.create({
        body,
        from: NEBOTS_TWFROM,
        to: phone
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }

    return res.sendStatus(200);
  }
  return res.sendStatus(400);
};
