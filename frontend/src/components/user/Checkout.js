import  React, { Component } from 'react';
import axios from "axios";
import './shop.css';
import { useParams } from 'react-router-dom';
import { useState,useEffect,useContext } from "react";
import { UserContext } from '../../App';

function Checkout(){
    const [post, setPost]=useState('');
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
    fetch("http://localhost:5000/ecart/orders", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
            productId: post._id,
        })
    }).then(res => res.json())
        .then(result => {
            setPost(result)
            console.log(result)
        } 
        )
        .catch(err => {
            console.log("error ==", err)
        })
     }, [])
    return( 
        <h2 id="heading">Congratulations !! Your order is  placed Sucessfully</h2>
    )    
}

export default Checkout;