const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
//const requirelogin = require('../middleware/requirelogin.js');
const Product = mongoose.model("Product");

router.post('/shop/add', (req,res) => {
    const product= new Product({
        cost:req.body.cost,
        description:req.body.description,
        quantity:req.body.quantity,
        name:req.body.name,
        shopId:req.body.shopId
    });
    product.save((err,data) => {
        res.status(200).json({ code:200,message:"Added",
        addProduct:data})
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


 router.put('/shop/update/:ProductId', (req,res) => {
    const product={
        cost:req.body.cost,
        description:req.body.description,
        quantity:req.body.quantity,
        name:req.body.name,
        images:req.body.images,
        shopId:req.body.shopId
    };
    Product.findByIdAndUpdate(req.params.ProductId, { $set:product}, {new:true}, (err, data) => {
        if(!err){
            res.status(200).json({code:200,message:'updated',
            updateProduct:data})
        }else{
            console.log(err);
        }
    });
 });

 router.delete('/shop/delete/:ProductId',(req,res) => {
    Product.findByIdAndRemove(req.params.ProductId, (err,data) => {
        if(!err){
            res.status(200).json({code:200, message :'deleted',
        deleteProduct:data});
        }
    });
 });


module.exports=router