const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
//const requirelogin = require('../middleware/requirelogin.js');
const Product = mongoose.model("Product");

router.post('/shop/add/:ShopId', (req,res) => {
    const Product= new Product({
        cost:req.body.cost,
        description:req.body.description,
        quantity:req.body.quantity,
        name:req.body.name,
        images:req.body.images
    });
    Product.save((err,data) => {
        res.status(200).json({ code:200,message:"Added",
        addProduct:data})
    });
 });

 router.put('/shop/update/:ShopId/:ProductId', (req,res) => {
    const Product= new Product({
        cost:req.body.cost,
        description:req.body.description,
        quantity:req.body.quantity,
        name:req.body.name,
        images:req.body.images
    });
    User.findByIdAndUpdate(req.params.ProductId, { $set:Product}, {new:true}, (err, data) => {
        if(!err){
            res.status(200).json({code:200,message:'updated',
            updateProduct:data})
        }else{
            console.log(err);
        }
    });
 });

 router.delete('/shop/delete/:ShopId',(req,res) => {
    MyCart.findByIdAndRemove(req.params.ShopId, (err,data) => {
        if(!err){
            res.status(200).json({code:200, message :'deleted',
        deleteProduct:data});
        }
    });
 });


module.exports=router