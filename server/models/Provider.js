const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mSchema = new Schema({
  _id: String,
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  valid: Boolean,
  validateKey: String,
  deleteKey: String
});

module.exports = mongoose.model('Provider', mSchema);
