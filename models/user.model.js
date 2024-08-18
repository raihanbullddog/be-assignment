const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: String,
  password: String,
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }]
});

module.exports = mongoose.model('User', UserSchema);