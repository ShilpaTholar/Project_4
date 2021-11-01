const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
//type = ration,desserts,cloths,cosmetics
const productSchema = new mongoose.Schema({
    cost: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    images: {
        type: String,
        required: false
    },
    area: {
        type: String,
        required: false
    },
    shopId: {
        type: ObjectId,
        ref: "User"
    }

})

mongoose.model("Product", productSchema);