import React from 'react'
import './footer.css'
import { Link } from "react-router-dom";

function Footer() {

    return (
        <div className="myfooter mt-5">
            <footer className="text-center text-lg-start">
                <div className="container p-4 pb-0">
                    <section className="">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase">About Us</h5>
                                <p>
                                    We make sure you recieve your product as soon as we have finished making it.
                                    We also provide free returns if you are not satisfied.
                                    For every purchase you make, we will ensure there are no damages or faults
                                    and we will check and test the product.
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                <h5 className="ps-3">Useful Links</h5>
                                <ul style={{ listStyleType: "none" }}>
                                    <li><Link>Explore Products</Link></li>
                                    <li><Link>My Cart</Link></li>
                                    <li><Link>My Wishlist</Link></li>
                                    <li><Link>Create My Shop</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-4 my-3">
                                <div className="row">
                                    <h5 className="text-center lead">Get Weekly Updates from</h5>
                                    <h5 className="text-center lead">ShopEase</h5>
                                    <h5 className="text-center lead">Sign up For Our Newsletter</h5>
                                </div>
                                <div className="row textbox" style={{ margin: "10px auto", width: "100%" }} >
                                    <input className="form-control" type="text"></input>
                                </div>
                                <div className="row">
                                    <button style={{ margin: "10px auto", width: "40%" }} className="btn btn-info">Sign up</button>
                                </div>
                            </div>
                        </div>
                    </section>


                    <hr className="mb-4" />
                    <section className="mb-4 text-center p-3">
                        <div class="credit">
                            <br />
                            <p id="connect">Connect with us</p>
                            <div class="rounded-social-buttons">
                                <a class="social-button facebook" href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook-f"></i></a>
                                <a class="social-button twitter" href="https://www.twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a>
                                <a class="social-button linkedin" href="https://www.linkedin.com/" target="_blank"><i class="fab fa-linkedin"></i></a>
                                <a class="social-button youtube" href="https://www.youtube.com/" target="_blank"><i class="fab fa-youtube"></i></a>
                                <a class="social-button instagram" href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a>
                            </div>
                            <p classname="text-center" id="connect">Copyright 2021</p>
                        </div>
                    </section>

                </div>
            </footer>

        </div>
    )
}

export default Footer