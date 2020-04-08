# Nebots

## Front-end

Made in React.

How does this work section for both clients and providers.

### For clients

A simple phone number they can call to for basic general tech support. Problems like the tv channels missing, the Internet not working, not being able to send or open an email, not knowing how to take a photo...

### For providers

A signup form with a phone number input.

Phone numbers will be verified via SMS before accounts are confirmed.

A call confirmation page submits a /call PUT request to accept a call when a provider clicks on an SMS notification.

A provider delete form verifies the phone again before submitting a DELETE request.

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

- SMS verification code submission
- Phone call forwarding

## To-Do

- ValidateKey not necessary if using ids?
- Use url params instead of slash
- Warning "overseas numbers while testing"
- Different colors for links vs normal text
- Create delete provider page
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
