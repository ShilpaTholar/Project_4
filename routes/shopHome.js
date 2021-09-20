const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Shop = mongoose.model("Shop");
const requirelogin = require('../middleware/requirelogin.js');


router.get('/shop/:shopId', requirelogin, (req, res) => {
    Shop.findOne({ _id: req.user._id })
        .then(result => {
            res.json(result)
        })
})

module.exports = router