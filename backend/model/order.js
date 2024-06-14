const { Schema, model, Types } = require('mongoose')
const orderSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'user' },
    products: [{
        productId: { type: Types.ObjectId, ref: 'product' },
        quantity: { type: Number },
        price: { type: Number }
    }],
    amount: {
        subtotal: { type: Number },
        discount: { type: Number, default: 0 },
        total: { type: Number }
    },
    paymentMethod: {
        method: { type: String, enum: ['Jazz Cash', 'Easypaisa', 'Bank Transfer', 'Cash on delivery'] },
        details: {
            phoneNumber: { type: String },
            cardNumber: { type: String },
            cvv: { type: String },
            expiryDate: { type: String },
            otp: { type: String }
        }
    }
})

module.exports = model('order', orderSchema)