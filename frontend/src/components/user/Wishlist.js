import  React, { Component } from 'react';
import { useState,useEffect,useContext } from "react";
import axios from "axios";
import {Container ,Row, Col} from "react-bootstrap";
import './shop.css';
import {useHistory ,Link} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App'

function Wishlist(){
    const [post, setPost]=useState('');
    const { state, dispatch } = useContext(UserContext);
     useEffect(() => {
    //     const baseUrl1= `http://localhost:5000/ecart/wishlist/add/${state.id}`;
    //     axios.get(baseUrl1).then((response) => {
    //     setPost(response.data);    
    //     console.log(response.data);
    fetch("http://localhost:5000/wishlist/add", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          userId: '617938ace84fdfd68e3af6bb',
          productId: '61744e095d075bef8901c12d',
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
        <h1>hii</h1>
    )
  
}


export default Wishlist;