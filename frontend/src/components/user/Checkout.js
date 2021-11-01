import React, { Component } from 'react';
import axios from "axios";
import './shop.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';

function Checkout() {
    const [post, setPost] = useState('');
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {

    }, [])
    return (
        <h2 id="heading">Congratulations !! Your order is  placed Sucessfully</h2>
    )
}

export default Checkout;