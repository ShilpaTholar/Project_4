import React from 'react';
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './shop.css';
import { Link } from "react-router-dom";
import { UserContext } from '../../App';
import styled from "styled-components";
import UserLogin from './userLogin';
import NavBar from './nav';
import Footer from '../footer';
import Modal from 'react-modal';

function Cart() {
    const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
`;
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            fontfamily: 'cursive'
        },
    };

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



    const [post, setPost] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
        fetch("http://localhost:5000/cart/view", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => {
                setPost(result)
                if (post.length > 0) {
                    var c = 0
                    post.map(ele => {
                        c = c + parseInt(ele.productId.cost) * ele.count;
                    })
                    localStorage.setItem("total", c)
                }
            }
            )
            .catch(err => {
                console.log("error ==", err)
            })
    }, [post])

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }


    const order = (e) => {
        e.preventDefault();

        fetch("http://localhost:5000/orders/add", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                items: post
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                openModal()
            })
            .catch(err => {
                console.log("error ==", err)
            })
    }

    const changeItem = (count, shouldreduce, id, event) => {
        event.preventDefault();
        fetch("http://localhost:5000/cart/cartupdate", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                count: shouldreduce ? count - 1 : count + 1,
                cartId: id
            })
        }).then(res => res.json())
            .then(result => {
            })
            .catch(err => {
                console.log("error ==", err)
            })
    }

    const removeCart = (id, event) => {
        event.preventDefault();
        fetch(`http://localhost:5000/cart/delete/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => {
            })
            .catch(err => {
                console.log("error ==", err)
            })
    }

    if (!state) {
        return <UserLogin />
    }
    else {
        return (
            <div>
                <NavBar />
                <Container>
                    <h2 className="wishlist">YOUR CART</h2>
                    <br />
                    <br />
                    <Row sm={2}>
                        <Row>
                            {
                                post && post.length > 0 ? post.map((ele, i) => {
                                    if (ele.productId != null) {
                                        return (
                                            <Row sm={1} key={'product-' + i}>
                                                <br />
                                                <br />

                                                <div class="card" style={{ width: "20rem" }}>
                                                    <Link to={"/DisplayProduct/" + ele.productId._id}>
                                                        <img class="card-img-top" style={{ height: "200px" }} src={ele.productId.images} alt="Card image cap" />
                                                    </Link>
                                                    <div class="card-body">
                                                        <h5 class="card-title">{ele.productId.name}</h5>
                                                        <div class="buy d-flex justify-content-between align-items-center">
                                                            <div class="price text-info"><h5 class="mt-4">Rs. {ele.productId.cost}</h5></div>
                                                            <div class="price text-info"><h5 class="mt-4">{ele.count}</h5></div>
                                                        </div>
                                                        <div className="center-block">
                                                            <button className="btn btn-danger me-2" onClick={(event) => { removeCart(ele.productId._id, event) }}><i className="far fa-trash-alt"></i></button>
                                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                                <button type="button" className="btn btn-secondary" onClick={(event) => { changeItem(ele.count, true, ele._id, event) }}>-</button>
                                                                <button type="button" className="btn btn-secondary">{ele.count}</button>
                                                                <button type="button" className="btn btn-secondary" onClick={(event) => { changeItem(ele.count, false, ele._id, event) }}>+</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br />
                                                </div>
                                                <br />

                                                <br />
                                            </Row>
                                        )
                                    }
                                }

                                ) : <div class="row">
                                    <div class="span12">
                                        <div class="alert alert-info">No products found</div>
                                    </div>
                                </div>
                            }
                        </Row>
                        <Col sm={5}>
                            <Summary className="ordersumm">
                                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                                <hr />
                                {
                                    post && post.length > 0 ? post.map((ele, i) => {
                                        if (ele.productId != null) {
                                            return (
                                                <SummaryItem>
                                                    <SummaryItemText>{ele.count} x {ele.productId.name}</SummaryItemText>
                                                    <SummaryItemPrice>Rs. {ele.count * parseInt(ele.productId.cost)}</SummaryItemPrice>
                                                </SummaryItem>
                                            )
                                        }
                                    }
                                    ) : <div></div>
                                }
                                <SummaryItem>
                                    <SummaryItemText>Shipping Charges</SummaryItemText>
                                    <SummaryItemPrice>Rs. 0</SummaryItemPrice>
                                </SummaryItem>
                                <hr />
                                <SummaryItem>
                                    <SummaryItemText>Bag Total</SummaryItemText>
                                    <SummaryItemPrice>Rs. {post.length > 0 ? localStorage.getItem("total") : 0}</SummaryItemPrice>
                                </SummaryItem>
                                <div class="col-md-12 text-center">
                                    <button class="btn btn-info btn-lg" onClick={order} style={{ align: 'center' }}>Checkout Now</button>
                                </div>
                            </Summary>
                        </Col>
                    </Row>
                </Container>
                <Footer />
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="row">
                        <i className="col-1 far fa-times-circle" onClick={closeModal}></i>
                        <p className="col-11 lead">Order placed successfully!</p>
                    </div>
                </Modal>

            </div>
        )
    }

}


export default Cart