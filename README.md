# nephews

Live version: [nebots.cat](https://nebots.cat)

## Front-end

Made in React.

### Sections

- "How does this work?" section for (both clients and providers).

#### For clients

- A simple phone number they can call to for basic general tech support. Problems like the tv channels missing, the Internet not working, not being able to send or open an email, not knowing how to take a photo...

#### For providers

- A signup form with a phone number input.

Phone numbers will be verified via SMS before accounts are confirmed.

When a call arrives, the provider receives an SMS with a link to accept the call if available.

- A provider delete form, also verified by SMS.

## Back-end

NodeJS/Express API

### Routes

| Route        | Method | Body/Query  | Result                                                                 |
| ------------ | ------ | ----------- | ---------------------------------------------------------------------- |
| /provider    | POST   | provider    | Registers new providers and submits an SMS with a validation code      |
| /provider    | DELETE | provider id | Starts the deletion process                                            |
| /provider/id | GET    | action      | Confirms a previously started action (validate or delete)              |
| /call        | POST   | call        | Creates a call element and pushes an SMS notification to all providers |
| /call/id     | GET    | provider id | Accepts the call and forwards it to the provider                       |

## External services

- SMS verification code submission (Twilio)
- Phone call forwarding (Twilio)

## To-Do

- Phone prefixes and validation
- Use variable for mp3 response
- Publish in temp site
- Implement voice recognition to determine call language and needs
- Let volunteers listen to need before accepting call
- Only validate after a short period of time
- Bring back validation/confirmation keys?
- Allow provider to set busy or available times
- Service quality monitoring
- Translate front end
- Delete Call document when the client hangs up prematurely
- Add real terms and conditions
- Classify calls by topic and language
- Better error handling
- Protect from brute force
- Protect from smsing/calling wrong numbers
- Authenticate webhook endpoint
