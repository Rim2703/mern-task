const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    discountType: { type: String, enum: ['flat', 'percentage'], required: true },
    productThumbnail: String,
});

module.exports = mongoose.model('Product', productSchema)