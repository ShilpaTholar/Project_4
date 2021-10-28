const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const expenseSchema = new mongoose.Schema({
    cost: {
        type: String,
        required: true
    },
    shopId: [{ type: ObjectId, ref: "User" }],
    productId: [{ type: ObjectId, ref: "Product" }],
})

mongoose.model("Expense", expenseSchema);