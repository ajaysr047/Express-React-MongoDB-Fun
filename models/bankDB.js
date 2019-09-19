const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const BankSchema = new Schema({
    AccNo: {
        type: Number,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true
    },
    Balance: {
        type: Number,
        // default: 0.0
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = bSchema = mongoose.model('bank',BankSchema);