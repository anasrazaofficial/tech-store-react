const { Schema, model, Types } = require('mongoose')
const cartSchema = new Schema({
    products: [{
        productId: { type: Types.ObjectId, ref: 'product' },
        quantity: Number
    }]
})

module.exports = model('cart', cartSchema)