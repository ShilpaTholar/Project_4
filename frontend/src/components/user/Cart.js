import React, { Component } from 'react';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import './shop.css';
import reactRouterDom, { useHistory, Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import styled from "styled-components";
import history from './history';

function Cart() {
  const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
`;

  const SummaryTitle = styled.h1`
  font-family:cursive;
  text-align: center;
  font-weight: 200;
  color:rgb(66, 206, 248);
`;

  const SummaryItem = styled.div`
  font-family:cursive;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

  const SummaryItemText = styled.span``;

  const SummaryItemPrice = styled.span``;

  const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color:rgb(66, 206, 248) ;
  color: black;
  font-weight: 600;
  font-family:cursive;
  box-shadow: 0 12px 16px 0 rgba(8, 4, 233, 0.24), 0 17px 50px 0 rgba(100, 188, 214, 0.19);

`;

    const history = useHistory();
    const [post, setPost] = useState('');
    const [cost, setCost] = useState(0);
    const [prod, setproduct] = useState('');
    const { state, dispatch } = useContext(UserContext);
    var c = 0;
    useEffect(() => {
        fetch("http://localhost:5000/ecart/cart/view", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => {
                setPost(result)
            }
            )
            .catch(err => {
                console.log("error ==", err)
            })
    }, [])

    const order = () => {
        fetch("http://localhost:5000/ecart/orders", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                productId: prod,
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
    }
    return (
        <Container>
            <h2 className="wishlist">YOUR CART</h2>
            <br />
            <br />
            <Row sm={2}>
                <Row>
                    {
                        post && post.length > 0 ? post.map((ele, i) => {
                            c = c + parseInt(ele.productId.cost);
                            localStorage.setItem("cost", c);
                            //setproduct((prod)=>[...prod,ele.productId._id])

                            return (
                                <Row sm={1} key={'product-' + i}>
                                    <br />
                                    <br />
                                    <Link to={"/Aftercart/" + ele.productId._id + "/" + ele._id}>
                                        <div class="card" style={{ width: "20rem" }}>
                                            <img class="card-img-top" style={{ height: "200px" }} src={ele.productId.images} alt="Card image cap" />
                                            <div class="card-img-overlay d-flex justify-content-end">
                                                <a href="#" class="card-link text-danger like">
                                                </a>
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">{ele.productId.name}</h5>
                                                <div class="buy d-flex justify-content-between align-items-center">
                                                    <div class="price text-info"><h5 class="mt-4">Rs. {ele.productId.cost}</h5></div>
                                                </div>
                                            </div>
                                            <br />
                                        </div>
                                        <br />
                                    </Link>
                                    <br />
                                </Row>
                            )
                        }

                        ) : <div class="row">
                            <div class="span12">
                                <div class="alert alert-info">No products found</div>
                            </div>
                        </div>
                    }
                </Row>
                <Col sm={5}>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <hr />
                        {
                            post && post.length > 0 ? post.map((ele, i) =>
                                <SummaryItem>
                                    <SummaryItemText>{ele.productId.name}</SummaryItemText>
                                    <SummaryItemPrice>Rs. {ele.productId.cost}</SummaryItemPrice>
                                </SummaryItem>
                            ) : <div></div>
                        }
                        <SummaryItem>
                            <SummaryItemText>Shipping Charges</SummaryItemText>
                            <SummaryItemPrice>Rs. 0</SummaryItemPrice>
                        </SummaryItem>
                        <hr />
                        <SummaryItem>
                            <SummaryItemText>Bag Total</SummaryItemText>
                            <SummaryItemPrice>Rs. {localStorage.getItem("cost")}</SummaryItemPrice>
                        </SummaryItem>
                        <div class="col-md-12 text-center">
                            <button class="btn btn-light btn-lg" style={{ align: 'center' }}>Checkout Now</button>
                        </div>
                    </Summary>
                </Col>
            </Row>
        </Container>
    )

}


export default Cart;