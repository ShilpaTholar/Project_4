import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import './shop.css';
import UserLogin from "./userLogin";
import NavBar from "./nav";
import Footer from "../footer";
import VisualData from './visualdata';


function Userprofile() {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();

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
                    </div>
                </div>
                <h3 className="wishlist" id="order">My orders</h3>
                <div className="m-4">
                    <VisualData />
                </div>
                <Footer />
            </>
        )
    }
}







export default Userprofile;