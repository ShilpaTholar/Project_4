const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const shopSchema = new mongoose.Schema({
    shop_name: {
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
    phone_no: {
        type: String,
        required: true
    },
    noOfProducts: {
        type: String,
        required: true
    },
    areaId: [{ type: ObjectId, ref: "Area" }]
})

mongoose.model("Shop", shopSchema);