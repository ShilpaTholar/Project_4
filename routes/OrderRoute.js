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


router.get("/expense/getall", requirelogin, (req, res) => {
    Expense.find({ userId: req.user._id }).sort({ "count": 'ascending' }).populate("productId", "cost").select({ count: 1, created_at: 1, cost: 1 }).then(result => {
        console.log(result)
        res.status(200).json({
            expense: result
        })
    }).catch(err => {
        console.log(err)
    })
})

router.get('/ecart/orders/view', requirelogin, (req, res) => {
    Order.find({ userId: req.user._id }).populate("productId").exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
});



module.exports = router

