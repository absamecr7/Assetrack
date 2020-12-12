const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userLoginSchema = new Schema({
        userID: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    }
);

const UserLogin = mongoose.model('UserLoginCollection', userLoginSchema);

module.exports = UserLogin;