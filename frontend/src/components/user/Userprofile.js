import React from 'react';
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import './shop.css';
import Lottie from 'react-lottie';
import useranmiation from '../../lotties/user'
import UserLogin from "./userLogin";
import NavBar from "./nav";
import Footer from "../footer";
import VisualData from './visualdata';
import { Container, Row, Col } from "react-bootstrap";


function Userprofile() {
    const { state, dispatch } = useContext(UserContext);

    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: useranmiation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };


    useEffect(() => {
        fetch('http://localhost:5000/ecart/orders/view', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setPost(result)
                setLoading(false)
                console.log(result)
            }).catch(err => {
                console.log('errr=', err)
            })

    }, [])


    if (!state) {
        return <UserLogin />
    } else {
        return (
            <>
                <NavBar />
                <div class="container rounded bg-white mt-5 mb-5">
                    <div class="row" id="profile">
                        <div class="col-md-5 border-right">
                            <div class="p-3 py-5">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h3 className="wishlist">YOUR PROFILE</h3>
                                    <hr />
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-12"><label class="labels">Name</label><input type="text" class="form-control" value={state.name} /></div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-12"><label class="labels">Area</label><input type="text" class="form-control" value={state.area} /></div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-md-12"><label class="labels">Address</label><input type="text" class="form-control" value={state.address} /></div>
                                </div> <div class="row mt-2">
                                    <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control" value={state.email} /></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <Lottie
                                options={defaultOptions}
                                height={400}
                                width={500}
                            />
                        </div>
                    </div>
                </div>
                <h3 className="wishlist mx-5" id="order">My orders</h3>
                <Container>
                    <Row>
                        {
                            loading ? <div>Loading.....</div> :
                                post && post.length > 0 ? post.map((ele, i) =>

                                    <Col sm={3} key={'product-' + i}>
                                        <br />

                                        <div class="card" style={{ width: "18rem" }}>
                                            <img class="card-img-top" style={{ height: "250px" }} src={ele.productId.images} alt="Card image cap" />
                                            <div class="card-img-overlay d-flex justify-content-end">
                                                <a href="#" class="card-link text-danger like">
                                                </a>
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-title">{ele.productId.name}</h5>
                                                <h5 class="card-title">Rs. {ele.productId.cost}</h5>
                                                <div class="buy d-flex justify-content-between align-items-center">
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ) : <div class="row">
                                    <div class="text-center">
                                        <div class="alert alert-info">No products found</div>
                                    </div>
                                </div>

                        }
                    </Row>

                </Container>
                {
                    state.shopName ?
                        <div className="m-4">
                            <h3 className="wishlist mx-5" id="order">My Shop</h3>
                            <VisualData />
                        </div>
                        :
                        <></>
                }
                <Footer />
            </>
        )
    }
}







export default Userprofile;