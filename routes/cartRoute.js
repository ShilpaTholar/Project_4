const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
//const requirelogin = require('../middleware/requirelogin.js');
const Cart = mongoose.model("Cart");
const requirelogin = require('../middleware/requirelogin');

//viewing the cart

router.get('/ecart/cart/view', requirelogin, (req, res) => {
    Cart.find({ userId: req.user._id }).populate("productId").exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
});

//mycart (adding a product)

router.post('/ecart/cart/add', requirelogin, (req, res) => {
    const cart = new Cart({
        userId: req.user._id,
        productId: req.body.productId
    });
    cart.save((err, data) => {
        if (data) {
            res.status(200).json({
                code: 200, message: "Added",
                addCart: data
            })
        } else {
            return res.status(422).json({ error: err })
        }
    });
});

// mycart (deleting a product)

router.delete('/ecart/cart/delete/:id', requirelogin, (req, res) => {
    Cart.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.status(200).json({
                code: 200, message: 'deleted',
                deleteCart: data
            });
        }
    });
});

module.exports = router



