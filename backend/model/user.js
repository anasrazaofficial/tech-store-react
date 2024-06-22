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
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    dob: Date,
    address: {
        street: String,
        city: String,
        country: String,
    },
    password: {
        type: String,
        required: true
    },
    loyaltyPoints: {
        type: Number,
        default: 0
    },
    token: String

})

module.exports = model('user', userSchema)