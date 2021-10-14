const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Shop = mongoose.model("Shop");
const { JWT_SECRET } = require('../config/keys')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    //authorization === Brearer token
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in!" });

    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in " })
        }
        const { _id } = payload;
        Shop.findById(_id).then(shopdata => {
            req.shop = shopdata;
            next();
        })
    })
}