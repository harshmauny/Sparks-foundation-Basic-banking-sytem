const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    senderId: mongoose.Schema.Types.ObjectId,
    recieverId: mongoose.Schema.Types.ObjectId,
    transactionId: { type: String },
    amount: { type: Number },
})
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;