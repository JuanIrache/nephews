const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postProvider = require('./modules/postProvider');
const validateProvider = require('./modules/validateProvider');
const ping = require('./modules/ping');

require('dotenv').config();

const {
  NEBOTS_PORT,
  NEBOTS_CLIENTURL,
  NODE_ENV,
  NEBOTS_ATLAS_USER,
  NEBOTS_ATLAS_PASS,
  NEBOTS_ATLAS_SERVER,
  NEBOTS_ATLAS_DB
} = process.env;

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

// Enable pre-flight request
app.options('/provider', cors());

// Validate provider
app.get('/provider/:id/validate/:key', cors(corsOptions), validateProvider);

// Add provider
app.post('/provider', cors(), postProvider);

//Check server status
app.get('/ping', cors(corsOptions), ping);

app.listen(NEBOTS_PORT, () =>
  console.log(`${getDate()} - Listening on port ${NEBOTS_PORT}`)
);
