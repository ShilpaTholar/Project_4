const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require('../middleware/requirelogin');
const Wishlist = mongoose.model("Wishlist");
const Review = mongoose.model("Review");



router.get('/wishlist/showremove/:id', requirelogin, (req, res) => {
    Wishlist.find({ userId: req.user._id, productId: req.params.id }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
});

//wishlist (adding a product)
router.post('/wishlist/wishlistadd', requirelogin, (req, res) => {
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
router.delete('/wishlist/delete/:id', requirelogin, (req, res) => {
    Wishlist.deleteOne({ productId: req.params.id }, (err, data) => {
        if (!err) {
            res.status(200).json({
                code: 200, message: 'deleted',
                deleteWishlist: data
            });
        }
    });
});

//viewing the wishlist shilps and anusha ye use karo XD
router.get('/wishlist/view', requirelogin, (req, res) => {
    Wishlist.find({ userId: req.user._id }).populate("productId").exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
});

//add review
router.post('/review/add', requirelogin, (req, res) => {
    const review = new Review({
        review: req.body.review,
        userId: req.user._id,
        productId: req.body.productId
    });
    review.save((err, data) => {
        if (data) {
            res.status(200).json({
                code: 200, message: "Added",
                addreview: data
            })
        } else {
            return res.status(422).json({ error: err })
        }
    });
})

//get reviews on a product
router.get('/review/view', requirelogin, (req, res) => {
    Review.find({ productId: req.user._id }).populate("userId").exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
})


module.exports = router

