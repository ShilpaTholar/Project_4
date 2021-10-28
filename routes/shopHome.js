const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const requirelogin = require('../middleware/requirelogin.js');


router.get('/shop/:shopId', requirelogin, (req, res) => {
    User.findOne({ _id: req.user._id })
        .then(result => {
            res.json(result)
        })
})

module.exports = router