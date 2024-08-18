const mongoose = require('mongoose');

const RecurringPaymentSchema = new mongoose.Schema({
  userId: String,
  accountId: String,
  amount: Number,
  interval: String // e.g. daily, weekly, monthly
});

module.exports = mongoose.model('RecurringPayment', RecurringPaymentSchema);