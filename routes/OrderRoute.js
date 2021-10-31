const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require('../middleware/requirelogin');
const Order = mongoose.model("Order");



//wishlist (adding a product)
router.post('/ecart/orders', requirelogin, (req, res) => {
    const order = new Order({
        userId: req.user._id,
        productId: req.body.productId
    });
    order.save((err, data) => {
        if (data) {
            res.status(200).json({
                code: 200, message: "Added",
                addOrder: data
            })
        } else {
            return res.status(422).json({ error: err })
        }
    });
});



module.exports = router

