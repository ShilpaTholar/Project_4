const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const Shop = mongoose.model("Shop");
const requirelogin = require('../middleware/requirelogin.js');

//get all products from shop which belong to area of user

router.get('./user/home', requirelogin, function (req, res) {

    shopids = Shop.find({ area: req.user.area._id }, { _id: 1 })

    //getting products
    Product.find({
        'shopId': { $in: shopids }
    }, function (err, docs) {
        console.log(docs);
    });

})

module.exports = router