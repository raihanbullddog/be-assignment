const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/payment-manager', { useNewUrlParser: true, useUnifiedTopology: true });

const Transaction = mongoose.model('Transaction', {
  amount: Number,
  timestamp: Date,
  toAddress: String,
  status: String
});

const RecurringPayment = mongoose.model('RecurringPayment', {
  userId: String,
  accountId: String,
  amount: Number,
  interval: String // e.g. daily, weekly, monthly
});

function processTransaction(transaction) {
  return new Promise((resolve, reject) => {
    console.log('Transaction processing started for:', transaction);

    // Simulate long running process
    setTimeout(() => {
      // After 30 seconds, we assume the transaction is processed successfully
      console.log('transaction processed for:', transaction);
      resolve(transaction);
    }, 30000); // 30 seconds
  });
}

app.post('/send', (req, res) => {
  const { amount, toAddress } = req.body;
  const transaction = new Transaction({ amount, toAddress, status: 'pending' });
  processTransaction(transaction)
    .then((processedTransaction) => {
      res.send('Transaction sent successfully');
    })
    .catch((error) => {
      res.status(500).send('Error sending transaction');
    });
});

app.post('/withdraw', (req, res) => {
  const { amount } = req.body;
  const transaction = new Transaction({ amount, status: 'pending' });
  processTransaction(transaction)
    .then((processedTransaction) => {
      res.send('Transaction withdrawn successfully');
    })
    .catch((error) => {
      res.status(500).send('Error withdrawing transaction');
    });
});

app.post('/recurring-payments', (req, res) => {
  const { userId, accountId, amount, interval } = req.body;
  const recurringPayment = new RecurringPayment({ userId, accountId, amount, interval });
  recurringPayment.save((err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send('Recurring payment set up successfully');
    }
  });
});