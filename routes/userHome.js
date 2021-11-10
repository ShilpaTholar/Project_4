const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const requirelogin = require('../middleware/requirelogin.js');

//get all products from shop which belong to area of user
router.get('/myshop', requirelogin, function (req, res) {
    Product.find({ shopId: req.user._id }, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
})

module.exports = router