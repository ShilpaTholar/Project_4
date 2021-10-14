const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: "User" },
    productId: { type: ObjectId, ref: "Product" },

})

mongoose.model("Cart", cartSchema);