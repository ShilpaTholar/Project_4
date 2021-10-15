const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
//const requirelogin = require('../middleware/requirelogin.js');
const Cart = mongoose.model("Cart");

//viewing the cart

router.get('/ecart/mycart/view/:userId', (req, res) => {
    Cart.findById( req.params.userId , (err, data) => {
        if (!err) {
            res.send(data);

        } else {
            console.log(err);
        }

    });
});

//mycart (adding a product)

router.post('/ecart/mycart/add', (req, res) => {
    const cart = new Cart({
        userId: req.body.userId,
        productId: req.body.productId
    });
    cart.save((err, data) => {
        res.status(200).json({
            code: 200, message: "Added",
            addCart: data
        })
    });
});

// mycart (deleting a product)

router.delete('/ecart/mycart/delete/:id', (req, res) => {
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



