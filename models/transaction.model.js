const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  timestamp: Date,
  toAddress: String,
  status: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);