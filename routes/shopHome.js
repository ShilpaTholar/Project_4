const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Shop = mongoose.model("Shop");
const requireshoplogin = require('../middleware/requireshoplogin.js');


router.get('/shop/:shopId', requireshoplogin, (req, res) => {
    Shop.findOne({ _id: req.shop._id })
        .then(result => {
            res.json(result)
        })
})

module.exports = router