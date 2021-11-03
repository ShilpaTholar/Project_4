const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require('../middleware/requirelogin');
const Order = mongoose.model("Order");
const Cart = mongoose.model("Cart");
const Expense = mongoose.model("Expense")


router.post('/orders/add', requirelogin, (req, res) => {
    console.log(req.body.items)
    console.log(req.body.items.length)
    Order.insertMany(req.body.items).then((result) => {
        Cart.deleteMany({ userId: req.user._id }).then((cartRes) => {
            Expense.insertMany(req.body.items).then((expenseRes) => {
                res.status(200).json({
                    code: 200, message: "Added",
                    addOrder: result,
                    deleteCart: cartRes,
                    addexpense: expenseRes
                })
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    }).catch(error => {
        console.log(error)
    })
});



module.exports = router

