const e = require('express');
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


//get cart ids

router.get('/cart/showincrement/:id', requirelogin, (req, res) => {
    Cart.find({ userId: req.user._id, productId: req.params.id }).select({ "count": 1 }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
});

//mycart (adding a product)

router.post('/cart/cartadd', requirelogin, (req, res) => {
    const cart = new Cart({
        userId: req.user._id,
        productId: req.body.productId,
        count: req.body.count
    });
    if (req.body.count > 1 && req.body.cartId != 0) {
        console.log("yooooooooo", req.body.cartId)
        Cart.findByIdAndUpdate(req.body.cartId, { $set: { count: req.body.count } }, { new: true }, (err, data) => {
            if (!err) {
                res.status(200).json({
                    code: 200, message: 'updated',
                    updateCart: data
                })
            } else {
                console.log(err);
            }
        });
    } else {
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
    }

});

// mycart (deleting a product)

router.delete('/ecart/cart/delete/:id', requirelogin, (req, res) => {
    Cart.deleteOne({ productId: req.params.id }, (err, data) => {
        if (!err) {
            res.status(200).json({
                code: 200, message: 'deleted',
                deleteCart: data
            });
        }
    });
});


router.delete('/ecart/cart/deleteall', requirelogin, (req, res) => {
    Cart.deleteMany({ userId: req.user._id }, (err, data) => {
        if (!err) {
            res.status(200).json({
                code: 200, message: 'deleted',
                deleteCart: data
            });
            console.log(req.user._id)
        }
    });
});

module.exports = router