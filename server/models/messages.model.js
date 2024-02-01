const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users",
        required: true, 
    }, 
    receiver: {
        type: String,
        ref: "Users",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
    }


    }, {timestamps: true})

const Messages = mongoose.model("Messages", MessagesSchema);

module.exports = Messages;