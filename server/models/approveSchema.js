const mongoose = require('mongoose');

const User = require('./userSchema');

const approve = mongoose.Schema({
    userId: {
        type : String,
        required: true,
    },
    Amount: {
        type: Number,
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false
    }
})

const approval = new mongoose.model("Approve", approve);

module.exports = approval;