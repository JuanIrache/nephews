# nephews

human tech support

Live demo: [nephews.tech](https://nephews.tech)

## About

**nephews** creates a link between people that struggle with tech and volunteers that are willing to help them. For users, for example the elderly, **nephews** looks just like a phone number they can call in order to get help. For volunteers, it is just an online form they can sign up to. No need to install anything. When somebody needs help, the system will look for a matching available volunteers, send them an SMS notification, and he who accepts the notification first will have the phone call redirected to them.

### How it works

This web-app consists of a Node.js back end using Express.js and a React.js front end. Twilio's Messaging API (SMS) is used for validation and deletion of accounts, and for call forwarding confirmation. Twilio's Voice API is used to redirect calls from users to volunteer while hiding the caller's identity.

## Features

- Node.js web server using [Express.js](https://npm.im/express)
- Client website using modern [React.js](https://reactjs.org/) with hooks and SCSS styles
- MongoDB database for storing user and call data, hosted in Atlas and accessed via Mongoose.
- Phone number available for users in need of basic tech support
- Registration form for volunteers, with accounts validated via SMS
- Configurable environment variables using `.env` file in the server ([dotenv](https://www.npmjs.com/package/dotenv)) and `.env.local` in the front end.

### Server API Routes

| Route        | Method | Body/Query  | Result                                                                         |
| ------------ | ------ | ----------- | ------------------------------------------------------------------------------ |
| /provider    | POST   | provider    | Registers new providers (volunteers) and submits an SMS with a validation code |
| /provider    | DELETE | provider id | Starts the deletion process                                                    |
| /provider/id | GET    | action      | Confirms a previously started action (validate or delete)                      |
| /call        | POST   | call        | Creates a call element and pushes an SMS notification to all providers         |
| /call/id     | GET    | provider id | Accepts the call and forwards it to the provider                               |

## How to use it

1. Create a [Twilio](https://www.twilio.com/) account
2. Purchase at least two phone numbers: One for receiving calls and sending SMS, one to use as a caller ID and hide the user's ID
3. Prepare a [MongoDB](https://www.mongodb.com/) database
4. Set up your environment variables in both front and back end
5. Use NPM commands to run locally or deploy the service

## Set up

### Requirements

- A server running [Node.js](https://nodejs.org/)
- An [Atlas](https://www.mongodb.com/cloud/atlas) account or access to some other [MongoDB](https://www.mongodb.com/) database
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)

### Configuration

You can copy `client/.env.local.example` and `server/.env.example` to `client/.env.local` and `server/.env` respectively and modify them to create your configuration. These are the necessary values:

#### Server side (.env)

| Config&nbsp;Value   | Description                                                                                                                   |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------- |
| NEBOTS_CLIENTURL    | Public facing website URL                                                                                                     |
| NEBOTS_PORT         | Port where the server should run                                                                                              |
| NEBOTS_SERVER       | Server base URL                                                                                                               |
| NEBOTS_ATLAS_USER   | Database user                                                                                                                 |
| NEBOTS_ATLAS_PASS   | Database password                                                                                                             |
| NEBOTS_ATLAS_SERVER | Database server                                                                                                               |
| NEBOTS_ATLAS_DB     | Database name                                                                                                                 |
| NEBOTS_TWACCOUNTSID | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console)                           |
| NEBOTS_TWAUTHTOKEN  | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console)                           |
| NEBOTS_TWSMS        | A Twilio phone capable of Voice and SMS - you can [get one here](https://www.twilio.com/console/phone-numbers/incoming)       |
| NEBOTS_TWPROXYNUM   | A Twilio phone used capable of Voice to hide caller IDs [get one here](https://www.twilio.com/console/phone-numbers/incoming) |

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
npm run build
```

Alternatively, you can use this command to start the server in development mode. It will reload whenever you change any files.

```bash
npm start
```

3. Install client dependencies and deploy

```bash
cd ../client
npm install
npm run deploy
```

Alternatively, you can use this command to start the client in development mode. It will reload whenever you change any files.

```bash
npm start
```

5. Navigate to your deployment url

### Cloud deployment

In order to make the website available to the public you might have to do some additional setup, for example using [Apache](https://httpd.apache.org/).

## Contributing

This template is open source and welcomes contributions.

[Visit the project on GitHub](https://github.com/JuanIrache/nephews)

## To-Do

- Customize mp3 response
- Implement voice recognition to determine call language and topic
- Let volunteers listen to need before accepting call
- Only validate sms after a short period of time
- Bring back validation/confirmation keys
- Allow provider to set busy or available times
- Service quality monitoring (including recording calls with the necessary legal background)
- Delete Call document when the client hangs up prematurely
- Add real terms and conditions
- Better error handling
- Protect from brute force
- Protect from smsing/calling wrong numbers
- Authenticate webhook endpoint

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as is.

[app prototyping barcelona]: https://prototyping.barcelona
