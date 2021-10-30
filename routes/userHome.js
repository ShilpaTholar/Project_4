const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const User = mongoose.model("User");
const requirelogin = require('../middleware/requirelogin.js');

//get all products from shop which belong to area of user

router.get('/user/home', requirelogin, function (req, res) {
    //console.log('in user home')
    res.send("success");
    // shopids = Shop.find({ area: req.user.area._id }, { _id: 1 })

    // //getting products
    // Product.find({
    //     'shopId': { $in: shopids }
    // }, function (err, docs) {
    //     if (!err) {
    //         res.send("success!")
    //         console.log(docs);
    //     }
    // });

})

module.exports = router