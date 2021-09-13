const { ObjectID } = require("mongodb");
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
    phoneNo: {
        type: String,
        required: true
    },
    productId: [{ type: ObjectId, ref: "Product" }]
})

mongoose.model("User", userSchema);