const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    hasShop: {
        type: Boolean,
        required: true
    },
    shopName: {
        type: String
    },
    noOfProducts: {
        type: String
    },
    shopProductId: [{ type: ObjectId, ref: "Product" }]
})

mongoose.model("User", userSchema);