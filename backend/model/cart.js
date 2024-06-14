const { Schema, model, Types } = require('mongoose')
const cartSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'user' },
    products: [{
        productId: { type: Types.ObjectId, ref: 'product' },
        quantity: { type: Number }
    }]
})

module.exports = model('cart', cartSchema)