const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const areaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    shopId: [{ type: ObjectId, ref: "User" }]
})

mongoose.model("Area", areaSchema);