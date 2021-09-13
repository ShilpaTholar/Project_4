const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
    cost: {
        type: String,
        required: true
    },
    modeOfPayment: {
        type: String,
        required: true
    },
    timeOfPurchase: {
        type: String,
        required: true
    },
    dateOfPurchase: {
        type: String,
        required: true
    },
    userId: [{ type: ObjectId, ref: "User" }],
    productId: [{ type: ObjectId, ref: "Product" }]
})

mongoose.model("Order", orderSchema);