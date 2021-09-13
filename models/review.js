const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    userId: [{ type: ObjectId, ref: "User" }],
    productId: [{ type: ObjectId, ref: "Product" }],
})

mongoose.model("Review", reviewSchema);