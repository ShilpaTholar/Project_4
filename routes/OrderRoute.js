const express = require('express');

const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require('../middleware/requirelogin');
const Order = mongoose.model("Order");
const Cart = mongoose.model("Cart");
const Expense = mongoose.model("Expense")
const Product = mongoose.model("Product");


router.post('/orders/add', requirelogin, (req, res) => {
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
    Expense.find().populate({
        path: "productId",
        select: "shopId cost",
        match: {
            shopId: {
                $eq: req.user._id
            }
        }
    }).then(result => {
        console.log("res iss", result)
        res.status(200).json({
            expense: result
        });
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

