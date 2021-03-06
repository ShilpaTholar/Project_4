import React, { Component } from 'react';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import './shop.css';
import { useHistory, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App'
import NavBar from './nav';
import Footer from '../footer';
import UserLogin from './userLogin';

function Wishlist() {
    const [post, setPost] = useState('');
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
        fetch("http://localhost:5000/wishlist/view", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
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


    if (!state) {
        return <UserLogin />
    }
    return (
        <div>
            <NavBar />
            <h3 className="wishlist">YOUR WISHLIST</h3>
            <div className="row container">
                {
                    post && post.length > 0 ? post.map((ele, i) =>
                        <div className="col-3" key={'product-' + i}>
                            <br />
                            <Link to={"/DisplayProduct/" + ele.productId._id}>
                                <div class="card" style={{ width: "90%" }}>
                                    <img class="card-img-top" style={{ width: "100%", height: "150px" }} src={ele.productId.images} alt="Card image cap" />
                                    <div class="card-img-overlay d-flex justify-content-end">
                                        <a href="#" class="card-link text-danger like">
                                        </a>
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">{ele.productId.name}</h5>
                                        <div class="buy d-flex justify-content-between align-items-center">
                                            <div class="price text-info text-center" style={{ textalign: "center" }}><h5 class="mt-4">Rs. {ele.productId.cost}</h5></div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ) : <div class="row">
                        <div class="span12">
                            <div class="alert alert-info">No products found</div>
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )

}


export default Wishlist;