const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middlewares');
const {Account} = require('../db');

router.get('/balance', authMiddleware, (req, res) => {
  const userId = req.userId;

  Account.findOne({userId})
    .then((account) => res.json({ balance: account.balance }))
    .catch((err) => res.status(500).json({message: 'Error getting balance', error}));
});

router.post('/transfer', authMiddleware, async (req, res) => {
  const {to, amount} = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {

    const fromAccount = await Account.findOne({userId: req.userId}).session(session);
    const toAccount = await Account.findOne({userId: to}).session(session);

    if(!fromAccount || !toAccount) {
      throw new Error('Invalid Account');
    }

    if(fromAccount.balance < amount) {
      throw new Error('Insufficient Balance');
    }

    fromAccount.balance -= amount;
    await fromAccount.save();

    toAccount.balance += amount;
    await toAccount.save();

    await session.commitTransaction();
    session.endSession();

    res.json({message: 'Transfer Successful'});
  }
  catch (err) {
    await session.abortTransaction();
    session.endSession();
    
    res.status(400).json({message: 'Transaction Failed', error: err.message});
  }
});

module.exports = router;