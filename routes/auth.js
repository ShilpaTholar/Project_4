const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys')


router.post('/user/signup', (req, res) => {
    const emailcheck = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    const passcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    const { name, password, confirmpassword, email, address, area, shopName, hasShop } = req.body
    if (!name || !password || !confirmpassword || !email || !address || !area) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    else {
        if (!email.match(emailcheck)) {
            return res.status(422).json({ error: "Please enter a valid email!" })
        } else if (password != confirmpassword) {
            return res.status(422).json({ error: "Please enter the same password" })
        } else if (!password.match(passcheck)) {
            return res.status(422).json({ error: "Please enter a password with atleast 6 characters, one letter, one special character" })
        }
        User.findOne({ email: email })
            .then(doc => {
                if (doc) {
                    return res.status(422).json({ error: "User with this email already exists" })
                }
                bcrypt.hash(password, 10)
                    .then(hashedpass => {
                        if (shopName) {
                            const user = new User({
                                name,
                                password: hashedpass,
                                email,
                                address,
                                area,
                                hasShop,
                                shopName
                            })
                            user.save()
                                .then(saveduser => {
                                    res.status(200).json({ message: "saved successfully" })
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        } else {
                            const user = new User({
                                name,
                                password: hashedpass,
                                email,
                                address,
                                hasShop,
                                area
                            })
                            user.save()
                                .then(saveduser => {
                                    res.status(200).json({ message: "saved successfully" })
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                    }).catch((err) => {
                        console.log(err);
                    })

            }).catch((err) => {
                console.log(err);
            })
    }

})

router.route("/user/login").post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).json({ error: "please add email and password" })
    }
    User.findOne({ email: email })
        .then(doc => {
            if (!doc) {
                return res.status(422).json({ error: "Invalid email or password" });
            }
            bcrypt.compare(password, doc.password)
                .then(doMatch => {
                    if (doMatch) {
                        console.log("doc:", doc)
                        const token = jwt.sign({ _id: doc._id }, JWT_SECRET)
                        const { _id, email, shopName, hasShop, address, area, productId, name } = doc;
                        res.json({ token, user: { _id, email, shopName, hasShop, address, area, productId, name } })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid email or password" });
                    }
                })
                .catch(err => {
                    console.log('error is', err);
                })

        })
})


module.exports = router