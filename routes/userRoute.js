const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
//const requirelogin = require('../middleware/requirelogin.js');
const User = mongoose.model("User");

router.get('/ecart/user/view/:id', (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data);
            console.log(req.params.id);
        }else{
            console.log(err);
        }

    });
});

//If user wants to update his info

router.put('/ecart/user/edit/:id', (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        address: req.body.address
    };
    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, data) => {
        if (!err) {
            res.status(200).json({
                code: 200, message: 'updated',
                updateUser: data
            })
        } else {
            console.log(err);
        }
    });
});

module.exports = router




















module.exports = router
