const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        maxlength: 11,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date
    },
    address: {
        street: { type: String },
        city: { type: String },
        country: { type: String }
    },
    password: {
        type: String,
        required: true
    },
    loyaltyPoints: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    }
})

module.exports = model('user', userSchema)