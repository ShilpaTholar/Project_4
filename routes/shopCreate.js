const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
//const requirelogin = require('../middleware/requirelogin.js');
const Shop = mongoose.model("Shop");

router.post('/shop/create', (req, res) => {
    const Shop = new Shop({
        shopname: req.body.shopname,
        address: req.body.address,
        password: req.body.password,
        eamil: req.body.email,
        noOfProducts: req.body.noOfProducts,
        area: req.body.area
    });
    Shop.save((err, data) => {
        res.status(200).json({
            code: 200, message: "Created",
            shopCreate: data
        })
    });
});