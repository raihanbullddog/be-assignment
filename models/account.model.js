const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  type: String,
  balance: Number,
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});

module.exports = mongoose.model('Account', AccountSchema);
