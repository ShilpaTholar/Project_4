import React from 'react'
import './landinpagecss.css';

function Footer() {

    return (
        <div className="container my-2 w-100" style={{ backgroundColor: "#83c1ff" }}>
            <footer className="text-center text-lg-start text-white">
                <div className="container p-4 pb-0">
                    <section className="">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase">About Us</h5>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Molestiae modi cum ipsam ad, illo possimus laborum ut
                                    reiciendis obcaecati. Ducimus, quas. Corrupti, pariatur eaque?
                                    Reiciendis assumenda iusto sapiente inventore animi?
                                </p>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                <h5 className="ps-3">Useful Links</h5>
                                <ul style={{ listStyleType: "none" }}>
                                    <li>Explore Products</li>
                                    <li>My Cart</li>
                                    <li>My Wishlist</li>
                                    <li>Create My Shop</li>
                                </ul>
                            </div>
                            <div className="col-lg-4 my-3">
                                <div className="row">
                                    <p className="text-center lead">Get Weekly Updates from</p>
                                    <p className="text-center lead">ShopEase</p>
                                    <p className="text-center lead">Sign up For Our Newsletter</p>
                                </div>
                                <div className="row textbox" style={{ margin: "10px auto", width: "100%" }} >
                                    <input className="form-control" type="text"></input>
                                </div>
                                <div className="row">
                                    <button style={{ margin: "10px auto", width: "40%" }} className="btn">Sign up</button>
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