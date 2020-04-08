const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mSchema = new Schema({
  validateKey: String
});

module.exports = mongoose.model('Call', mSchema);
