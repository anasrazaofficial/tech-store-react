const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    productName: { type: String },
    description: { type: String },
    img: { type: String },
    price: { type: Number }
})

module.exports = model('product', productSchema)