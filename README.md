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

- /provider POST Registers new providers and submits an SMS with a validation code
- /provider/id PUT Verifies providers by validating the SMS or starts the delete process
- /provider/id DELETE Verifies the deletion confirmation code and deletes the provider

- /call POST Creates a call element and pushes an SMS notification to all providers
- /call/id PUT Accepts the call and forwards the specific phone call from the client to the provider
- /call/id DELETE Deletes the call element

## External services

- SMS verification code submission
- Phone call forwarding

## To-Do

- Mobile sizes
- Add terms and conditions

## Potentially

- Classify calls and providers by topic and language
