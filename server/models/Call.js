const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mSchema = new Schema({
  _id: String,
  validateKey: { type: String, required: true, unique: true },
  callSid: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Call', mSchema);
