const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uid = require('uid');

const Provider = require('./models/Provider');

require('dotenv').config();

const {
  NEBOTS_PORT,
  NEBOTS_CLIENTURL,
  NODE_ENV,
  NEBOTS_ATLAS_USER,
  NEBOTS_ATLAS_PASS,
  NEBOTS_ATLAS_SERVER,
  NEBOTS_ATLAS_DB,
  NEBOTS_TWACCOUNTSID,
  NEBOTS_TWAUTHTOKEN,
  NEBOTS_TWFROM,
  NEBOTS_SERVER
} = process.env;

const twilio = require('twilio')(NEBOTS_TWACCOUNTSID, NEBOTS_TWAUTHTOKEN);

const getDate = () => {
  return new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid'
  });
};

app.use(bodyParser.json());

mongoose.connect(
  `mongodb+srv://${NEBOTS_ATLAS_USER}:${NEBOTS_ATLAS_PASS}@${NEBOTS_ATLAS_SERVER}/${NEBOTS_ATLAS_DB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);

const corsOptions =
  NODE_ENV === 'production'
    ? {
        origin: NEBOTS_CLIENTURL,
        optionsSuccessStatus: 200
      }
    : null;

app.get('/provider/:id/validate/:key', cors(corsOptions), async (req, res) => {
  const provider = await Provider.findOne({
    _id: req.params.id,
    validateKey: req.params.key
  }).exec();
  if (provider) {
    provider.valid = true;
    await provider.save();
    return res.status(200).send('<h1>Compte validat correctament</h1>');
  } else {
    return res.status(400).send('<h1>Alguna cosa ha anat malament</h1>');
  }
});

// enable pre-flight request
app.options('/provider', cors());

app.post('/provider', cors(), async (req, res) => {
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
        body: `Benvingut a nebots. Segueix aquest enllaç per confirmar el teu compte ${NEBOTS_SERVER}/provider/${_id}/${validateKey}`,
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
});

//Check status
app.get('/ping', cors(corsOptions), async (req, res) => {
  var os = require('os');
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }
  res.json({ status: 'ok', ip: addresses[0] });
});

app.listen(NEBOTS_PORT, () =>
  console.log(`${getDate()} - Listening on port ${NEBOTS_PORT}`)
);
