const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postProvider = require('./components/postProvider');
const getProvider = require('./components/getProvider');
const deleteProvider = require('./components/deleteProvider');
const postCall = require('./components/postCall');
const getCall = require('./components/getCall');
const ping = require('./components/ping');

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

// Parse incoming POST params with Express middleware
app.use(bodyParser.urlencoded({ extended: false }));
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
    ? { origin: NEBOTS_CLIENTURL, optionsSuccessStatus: 200 }
    : {};

// Enable pre-flight request
app.options('/provider', cors());

// Add provider
app.post('/provider', cors(), postProvider);

// Validate provider
app.get('/provider/:id', cors(corsOptions), getProvider);

// Enable pre-flight request
app.options('/provider/:id', cors());
// Delete provider
app.delete('/provider', cors(), deleteProvider);

// Add call
app.post('/call', cors(), postCall);

// Confirm call
app.get('/call/:id', cors(corsOptions), getCall);

//Check server status
app.get('/ping', cors(corsOptions), ping);

app.listen(NEBOTS_PORT, () =>
  console.log(`${getDate()} - Listening on port ${NEBOTS_PORT}`)
);
