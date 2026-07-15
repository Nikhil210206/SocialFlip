const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    monetized: {
        type: Boolean,
        default: false,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    recoveryEmail: {
        type: String,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;