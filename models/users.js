const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../utils/handleMongooseError');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: '',
        required: [true, 'Verify token is required'],
    }, 
}, { versionKey: false, timestamps: true, });

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = {
    userSchema,
    User,
};