# nephews

human tech support

Live demo: [nephews.tech](https://nephews.tech)

## About

**nephews** creates a link between people that struggle with tech and volunteers that are willing to help them. For users, for example the elderly, **nephews** looks just like a phone number they can call in order to get help. For volunteers, it is just an online form they can sign up to. No need to install anything. When somebody needs help, the system will look for matching available volunteers, send them an SMS notification, and he who accepts the notification first will have the phone call redirected to them.

### How it works

This web-app consists of a Node.js back end using Express.js and a React.js front end. Twilio's Messaging API (SMS) is used for validation and deletion of accounts, and for availability confirmations. Twilio's Voice API is used to handle incoming calls and to generate new ones between users and volunteers while hiding the caller's identity.

1. User dials the **nephews** number
2. User is asked to explain their problem while their message is recorded and transcribed
3. The transcription is used to filter potential volunteers by language and topic
4. Selected volunteers are notified by SMS. They can review the recorded message to decide if they can help
5. When a volunteer confirms their availability, a new call is created between them and the user

## Features

- Node.js web server using [Express.js](https://npm.im/express)
- Simple call filtering module based on topics found in transcribed calls
- Client website using modern [React.js](https://reactjs.org/) with hooks and SCSS styles
- MongoDB database for storing user and call data, hosted in Atlas and accessed via Mongoose.
- Phone number available for users in need of basic tech support
- Registration form for volunteers, with accounts validated via SMS
- Configurable environment variables using `.env` file in the server ([dotenv](https://www.npmjs.com/package/dotenv)) and `.env.local` in the front end.

### Server API Routes

| Route          | Method | Body/Query    | Result                                                                                      |
| -------------- | ------ | ------------- | ------------------------------------------------------------------------------------------- |
| /provider      | POST   | provider      | Registers new providers (volunteers) and submits an SMS with a validation code              |
| /provider      | DELETE | provider id   | Starts the deletion process                                                                 |
| /provider/id   | GET    | action        | Confirms a previously started action (validate or delete)                                   |
| /call          | POST   | call          | Handles an incoming call by providing instructions and starts recording and transcribing it |
| /call/id       | GET    | provider id   | Starts a new call between a user and the provider who accepted the request                  |
| /transcription | POST   | transcription | Tries to interpret a transcription to filter a call and notify providers by SMS             |

## How to use it

1. Create a [Twilio](https://www.twilio.com/) account
2. Purchase a phone number that can handle SMS anc Voice
3. Configure your phone number with a Webhook that points to **your server url + /call** when calls come in
4. Prepare a [MongoDB](https://www.mongodb.com/) database
5. Set up your environment variables in both front and back end
6. Use NPM commands to run locally or deploy the service

## Set up

### Requirements

- A server running [Node.js](https://nodejs.org/)
- An [Atlas](https://www.mongodb.com/cloud/atlas) account or access to some other [MongoDB](https://www.mongodb.com/) database
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)

### Configuration

You can copy `client/.env.local.example` and `server/.env.example` to `client/.env.local` and `server/.env` respectively and modify them to create your configuration. These are the necessary values:

#### Server side (.env)

| Config&nbsp;Value | Description                                                                                                             |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------- |
| NES_CLIENTURL     | Public facing website URL                                                                                               |
| NES_PORT          | Port where the server should run                                                                                        |
| NES_SERVER        | Server base URL                                                                                                         |
| NES_DBUSER        | Database user                                                                                                           |
| NES_DBPASS        | Database password                                                                                                       |
| NES_DBSERVER      | Database server                                                                                                         |
| NES_DBNAME        | Database name                                                                                                           |
| NES_TWACCOUNTSID  | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console)                     |
| NES_TWAUTHTOKEN   | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console)                     |
| NES_TWNUMBER      | A Twilio phone capable of Voice and SMS - you can [get one here](https://www.twilio.com/console/phone-numbers/incoming) |

#### Client side (.env.local)

| Config&nbsp;Value | Description                          |
| :---------------- | :----------------------------------- |
| REACT_APP_SERVER  | Server base URL                      |
| REACT_APP_ENV     | production or development mode       |
| REACT_APP_DEPLOY  | Directory to deploy the website      |
| REACT_APP_PHONE   | Formatted public-facing phone number |

### Local development

After the above requirements have been met:

1. Clone this repository and `cd` into it

```bash
git clone git@github.com:juanirache/nephews.git
cd nephews
```

2. Install server dependencies and build

```bash
cd server
npm install
npm start
```

3. Install client dependencies and start front end

```bash
cd ../client
npm install
npm start
```

5. Navigate to your deployment url

### Cloud deployment

2. Build the server and keep it running

```bash
cd server
npm run build
```

3. Deploy front end

```bash
cd ../client
npm run deploy
```

In order to make the website available to the public you might have to do some additional server setup, for example using [Apache](https://httpd.apache.org/). Check with your hosting provider.

### Testing

You can test the backend modules like so:

```bash
cd server
npm run test
```

## Contributing

This template is open source and welcomes contributions.

[Visit the project on GitHub](https://github.com/JuanIrache/nephews)

## To-Do

- Customize mp3 response
- Enhance validation/confirmation with time-limited keys
- Allow provider to set busy or available times
- Support additional languages in transcriptions (with Gather)
- Record relevant portion of call while using gather
- Use vocabulary databases and APIs to enhance topic filtering
- Service quality monitoring (including recording calls with the necessary legal background)
- Potentially allow multiple calls per user
- More comprehensive testing
- Add real terms and conditions and legal docs
- Authenticate webhook endpoint
- Better error handling
- Protect from brute force
- Protect from smsing/calling wrong numbers

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.

[app prototyping barcelona]: https://prototyping.barcelona
