# Nebots

## Front-end

Made in React.

- How does this work section for (both clients and providers).

### For clients

- A simple phone number they can call to for basic general tech support. Problems like the tv channels missing, the Internet not working, not being able to send or open an email, not knowing how to take a photo...

### For providers

- A signup form with a phone number input.

Phone numbers will be verified via SMS before accounts are confirmed.

When a call arrives, the provider receives an SMS with a link to accept the call if available.

- A provider delete form, also verified by SMS.

## Back-end

NodeJS/Express API

### Routes

| Route        | Method | Body/Query | Result                                                                 |
| ------------ | ------ | ---------- | ---------------------------------------------------------------------- |
| /provider    | POST   | provider   | Registers new providers and submits an SMS with a validation code      |
| /provider/id | DELETE |            | Starts the deletion process                                            |
| /provider/id | GET    | action     | Confirms a previously started action (validate or delete)              |
| /call        | POST   | call       | Creates a call element and pushes an SMS notification to all providers |
| /call/id     | GET    | provider   | Accepts the call and forwards it to the provider                       |

## External services

- SMS verification code submission (Twilio)
- Phone call forwarding (Twilio)

## To-Do

- Music between voice sentence
- Create delete provider page
- Warning "overseas numbers while testing"
- Different colors for links vs normal text
- Handle cors
- Better error handling
- Mobile sizes
- Favicons and some restyling
- Classify calls and providers by topic and language
- Add terms and conditions
- Better id and keys management
- Protect from brute force
- Protect from smsing/calling expensive numbers
- Authenticate webhook endpoint
