const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const shopSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    noOfProducts: {
        type: String
    },
    area: {
        type: String,
        required: true
    }
})

mongoose.model("Shop", shopSchema);