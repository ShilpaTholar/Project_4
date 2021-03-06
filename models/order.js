const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User"
    },
    count: { type: Number, required: true },
    productId: { type: ObjectId, ref: "Product" }
})

mongoose.model("Order", orderSchema);