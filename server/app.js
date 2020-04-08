const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Provider = require('./models/Provider');

require('dotenv').config();

const {
  GTE_PREMIUM_PORT,
  GTE_PREMIUM_CLIENTURL,
  NODE_ENV,
  GTE_PREMIUM_ATLAS_USER,
  GTE_PREMIUM_ATLAS_PASS,
  GTE_PREMIUM_ATLAS_SERVER,
  GTE_PREMIUM_ATLAS_DB,
} = process.env;

const getDate = () => {
  return new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
  });
};

app.use(bodyParser.json());

mongoose.connect(
  `mongodb+srv://${GTE_PREMIUM_ATLAS_USER}:${GTE_PREMIUM_ATLAS_PASS}@${GTE_PREMIUM_ATLAS_SERVER}/${GTE_PREMIUM_ATLAS_DB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const corsOptions =
  NODE_ENV === 'production'
    ? {
        origin: GTE_PREMIUM_CLIENTURL,
        optionsSuccessStatus: 200,
      }
    : {};

app.get('/provider/:id', cors(corsOptions), async (req, res) => {
  const provider = await Provider.findOne({
    'payments.downloadKey': req.params.id,
  }).exec();
  return res.status(200).send('<h1>To Do</h1>');
});

app.post('/provider', cors(corsOptions), async (req, res) => {
  if (req.body) {
    return res.json({
      valid: true,
    });
  }
  return res.status(400).send({
    message: 'Bad coupon data',
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

app.listen(GTE_PREMIUM_PORT, () =>
  console.log(`${getDate()} - Listening on port ${GTE_PREMIUM_PORT}`)
);
