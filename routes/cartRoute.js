const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
//const requirelogin = require('../middleware/requirelogin.js');
const Recipe = mongoose.model("../models/cart");

//viewing the cart

router.get('/ecart/mycart/view/:id', (req,res) => {
    Cart.findById({userId:req.params.id}, (err, data) => {
        if(!err) {
            res.send(data);
        }else{
            console.log(err);
        }

    });
});

//mycart (adding a product)

router.post('/ecart/mycart/add', (req,res) => {
    const Cart= new Cart({
        userId:req.body.userId,
        productId:req.body.productId
    });
    Cart.save((err,data) => {
        res.status(200).json({ code:200,message:"Added",
        addCart:data})
    });
 });

// mycart (deleting a product)

router.delete('/ecart/mycart/delete/:id',(req,res) => {
    Cart.findByIdAndRemove(req.params.id, (err,data) => {
        if(!err){
            res.status(200).json({code:200, message :'deleted',
        deleteCart:data});
        }
    });
 });

module.exports=router



