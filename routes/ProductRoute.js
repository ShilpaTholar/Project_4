const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require('../middleware/requirelogin.js');
const Product = mongoose.model("Product");
const User = mongoose.model("User");

router.post('/shop/add/:shopid', requirelogin, (req, res) => {
    const product = new Product({
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity,
        name: req.body.name,
        images: req.body.images,
        shopId: req.params.shopid
    });
    product.save((err, data) => {
        if (data) {
            User.findByIdAndUpdate(req.user._id, {
                $push: { shopProductId: data._id }
            }, {
                new: true
            }).exec((err, result) => {
                if (err) {
                    return res.status(422).json({ error: err })
                } else {
                    res.json(result)
                }
            })
        }
    });
});



 router.get('/shop/display/:keyword', (req,res) => {
    Product.find( {name:req.params.keyword }, (err, data) => {
        if (!err) {
            res.send(data);

        } else {
            console.log(err);
        }

    });
 })
 router.get('/product/view/:id', (req, res) => {
    Product.findById( req.params.id , (err, data) => {
        if (!err) {
            res.send(data);

        } else {
            console.log(err);
        }

    });
});

 router.get('/shop/display', (req,res) => {
    Product.find({},(err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }

    });
 })



router.put('/shop/update/:ProductId', requirelogin, (req, res) => {
    const product = {
        cost: req.body.cost,
        description: req.body.description,
        quantity: req.body.quantity,
        name: req.body.name,
        images: req.body.images,
        shopId: req.body.shopId
    };
    Product.findByIdAndUpdate(req.params.ProductId, { $set: product }, { new: true }, (err, data) => {
        if (!err) {
            res.status(200).json({
                code: 200, message: 'updated',
                updateProduct: data
            })
        } else {
            console.log(err);
        }
    });
});

router.delete('/shop/delete/:ProductId', requirelogin, (req, res) => {
    console.log(req.params.ProductId)
    Product.findByIdAndDelete(req.params.ProductId, (err, data) => {
        if (data) {
            User.findByIdAndUpdate(req.user._id, {
                $pull: { shopProductId: data._id }
            }, {
                new: true
            }).exec((err, result) => {
                if (err) {
                    return res.status(422).json({ error: err })
                } else {
                    res.json(result)
                }
            })
        }
    });
});

//get a shops all products
router.get('/shop/products/:shopid', requirelogin, (req, res) => {
    Product.find({ shopId: req.params.shopid }, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }

    });
})

//get a product
router.get('/shop/getparticularproduct/:productId', requirelogin, (req, res) => {
    Product.find({ _id: req.params.productId }, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }

    });
})

module.exports = router