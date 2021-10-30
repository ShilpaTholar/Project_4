const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require('../middleware/requirelogin');
//const requirelogin = require('../middleware/requirelogin.js');
const Wishlist = mongoose.model("Wishlist");


//wishlist (adding a product)
router.post('/ecart/wishlist/add', requirelogin, (req, res) => {
    const wishlist = new Wishlist({
        userId: req.user._id,
        productId: req.body.productId
    });
    wishlist.save((err, data) => {
        if (data) {
            res.status(200).json({
                code: 200, message: "Added",
                addWishlist: data
            })
        } else {
            return res.status(422).json({ error: err })
        }
    });
});

//wishlist (deleting a product)

router.delete('/ecart/wishlist/delete/:id', requirelogin, (req, res) => {
    Wishlist.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.status(200).json({
                code: 200, message: 'deleted',
                deleteWishlist: data
            });
        }
    });
});

//viewing the wishlist shilps and anusha ye use karo XD
router.get('/ecart/wishlist/view', requirelogin, (req, res) => {
    Wishlist.find({ userId: req.user._id }).populate("productId").exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
});
module.exports = router