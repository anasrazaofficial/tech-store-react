const { Schema, model, Types } = require('mongoose')
const orderSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'user' },
    products: [{
        productId: { type: Types.ObjectId, ref: 'product' },
        quantity: Number,
        price: Number
    }],
    amount: {
        subtotal: Number,
        discount: { type: Number, default: 0 },
        total: Number
    },
    paymentMethod: {
        method: { type: String, enum: ['Jazz Cash', 'Easypaisa', 'Bank Transfer', 'Cash on delivery'] },
        details: {
            phoneNumber: String,
            cardNumber: String,
            cvv: String,
            expiryDate: String,
            otp: String
        }
    }
})

module.exports = model('order', orderSchema)