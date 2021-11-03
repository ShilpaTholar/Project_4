const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const expenseSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User"
    },
    count: { type: Number, required: true },
    productId: { type: ObjectId, ref: "Product" },
    created_at: { type: Date, default: Date.now }
})

mongoose.model("Expense", expenseSchema);