const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postProvider = require('./routes/postProvider');
const getProvider = require('./routes/getProvider');
const deleteProvider = require('./routes/deleteProvider');
const postCall = require('./routes/postCall');
const getCall = require('./routes/getCall');
const ping = require('./routes/ping');
const getDate = require('./modules/getDate');
const postTranscription = require('./routes/postTranscription');

require('dotenv').config();

const {
  NES_PORT,
  NES_CLIENTURL,
  NODE_ENV,
  NES_DBUSER,
  NES_DBPASS,
  NES_DBSERVER,
  NES_DBNAME
} = process.env;

// Parse incoming POST params with Express middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  `mongodb+srv://${NES_DBUSER}:${NES_DBPASS}@${NES_DBSERVER}/${NES_DBNAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);

const corsOptions =
  NODE_ENV === 'production'
    ? { origin: NES_CLIENTURL, optionsSuccessStatus: 200 }
    : {};

app.use(cors(corsOptions));

// Add provider
app.post('/provider', postProvider);

// Validate or delete provider
app.get('/provider/:id', getProvider);

// Delete provider
app.delete('/provider', deleteProvider);

// Add call
app.post('/call', postCall);

// Confirm call
app.get('/call/:id', getCall);

//Check server status
app.get('/ping', ping);

// Receive transcription
app.post('/transcription', postTranscription);

app.listen(NES_PORT, () =>
  console.log(`${getDate()} - Listening on port ${NES_PORT}`)
);
