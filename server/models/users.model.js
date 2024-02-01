const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "User name is required!"],
        minlength: [3, "User name must be at least 3 characters long!"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [3, "Password must be at least 3 characters long!"]
    },
    email: {
        type: String,
        required: true
    },
    image: [{
        type: String,
        required: [true, "User image is required!"]
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }]

}, { timestamps: true });

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;

