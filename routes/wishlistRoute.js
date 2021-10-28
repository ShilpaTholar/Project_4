const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
//const requirelogin = require('../middleware/requirelogin.js');
const Wishlist = mongoose.model("Wishlist");

//wishlist (adding a product)

// router.post('/ecart/wishlist/add', (req, res) => {
//     const wishlist = new Wishlist({
//         userId: req.body.userId,
//         productId: req.body.productId
//     });

//     wishlist.populate("productId", "cost description name images quantity").exec((err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         } else {
//             wishlist.save()
//             res.status(200).json({
//                 code: 200, message: "Added",
//                 addWishlist: data
//             })
//         }
//     })
// });

//wishlist (deleting a product)

router.delete('/ecart/wishlist/delete/:id', (req, res) => {
    Wishlist.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.status(200).json({
                code: 200, message: 'deleted',
                deleteWishlist: data
            });
        }
    });
});

//viewing the wishlist

router.get('/ecart/wishlist/view/:id', (req, res) => {
    Wishlist.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }

    });
});
module.exports = router

