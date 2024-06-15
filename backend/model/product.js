const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    productName: String,
    description: String,
    features: { type: [String] },
    img: String,
    price: Number
})

module.exports = model('product', productSchema)