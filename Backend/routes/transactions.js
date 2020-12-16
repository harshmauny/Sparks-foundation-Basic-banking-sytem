const router = require('express').Router();
let Transaction = require('../models/transactions.model');
const User = require('../models/users.model');
const { v4: uuidv4 } = require('uuid');

router.route('/').get((req, res) => {
    Transaction.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const senderId = req.body.senderId;
    const recieverId = req.body.recieverId;
    const amount = req.body.amount;
    User.findById(senderId)
        .then(sid => {
            if (amount > 0 && amount < sid.currBal) {
                console.log("amount correct")
                sid.currBal = sid.currBal - amount;
                User.findByIdAndUpdate(senderId, { currBal: sid.currBal }, { new: true }, function(err, docs) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("Updated User : ", docs);
                    }
                })
                const transactionId = uuidv4();
                User.findById(recieverId)
                    .then(rid => {
                        rid.currBal = rid.currBal + Number(amount);
                        User.findByIdAndUpdate(recieverId, { currBal: rid.currBal }, { new: true }, function(err, docs) {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("Updated User : ", docs);
                            }
                        })
                    })
                const newTransaction = new Transaction({ senderId, transactionId, recieverId, amount });
                newTransaction.save()
                    .then(() => res.json("Transaction successful!"))
                    .catch(err => res.status(400).json('Error: ' + err));
            } else {
                console.log("amount invalid!!")
                res.json("amount exceeded!")
            }
        })
        .catch(err => res.status(400).json('Error: ' + err))
});
module.exports = router;