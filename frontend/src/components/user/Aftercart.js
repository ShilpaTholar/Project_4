import  React, { Component } from 'react';
import { useState,useEffect } from "react";
import axios from "axios";
import './shop.css';
import { useParams } from 'react-router-dom';


const Aftercart = () => {
    const [post, setPost]=useState('');
    const { id ,id1} = useParams();
    useEffect(() => {
       // console.log(id)
        const baseUrl= `http://localhost:5000/product/view/${id}`;
        axios.get(baseUrl).then((response) => {
        setPost(response.data);    
       // console.log(post);
    }, [])
  
});
  const removeCart = (event)=> {
    event.preventDefault();
   // const deleteId=post._id;
    console.log(id1)
    //console.log("inside wishlist")
    //console.log(post._id)
    fetch(`http://localhost:5000/ecart/cart/delete/${id1}`, {
      method: "delete",
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
  }).then(res => res.json())
      .then(result => {
         // setPost(result)
          console.log("deleted from cart");
      } 
      )
      .catch(err => {
          console.log("error ==", err)
      })
  }
    return (
        <section class="h-30">
        <div class="container py-1">
          <div class="row d-flex justify-content-center align-items-center h-30">
            <div class="col">
              <div class="card card-registration my-4">
                <div class="row" style={{height:"40rem"}}>
                  <div class="col-xl-6 d-none d-xl-block">
                    <img
                      src={post.images}
                      alt="Sample photo"
                      class="img-fluid"
                      style={{borderTopLeftRadius: ".25rem",borderBottomLeftRadius: ".25rem",width:"50rem",height:"40rem"}}
                    />
                  </div>
                  <div class="col-xl-6">
                    <div class="card-body p-md-5 text-black">
                      <h5 class="mb-5 text-uppercase" id="display">{post.name}</h5>
                      <hr/>
                      <br/>
      
                      <div class="row">
                        <div class="col-12 mb-3">
                        <div>
                            <h3 id="data">About the product:</h3>
                            <h3>{post.description}</h3>
                        </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 mb-3">
                         <h3 id="data">Price:</h3>
                         <h3>Rs. {post.cost}</h3>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-12 mb-3">
                        <h3 id="data">Quantity:</h3>
                        <h3>{post.quantity}</h3>
                        </div>
                      </div>
                      <div class="center-block">
                         <button class="btn btn-light btn-lg" onClick={(event) => {removeCart(event)}}><i class="fas fa-heart"></i>Remove from Cart</button>                        
                      </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
       
    );
}

export default Aftercart;