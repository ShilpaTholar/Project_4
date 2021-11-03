import React from 'react';
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../App';
import './shop.css';
import { useParams } from 'react-router-dom';
import UserLogin from './userLogin'


const Aftercart = () => {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {

    fetch(`http://localhost:5000/product/view/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    }).then(res => res.json())
      .then(result => {
        setPost(result);
      }
      )
      .catch(err => {
        console.log("error ==", err)
      })


  }, []);

  const removeCart = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/cart/delete/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    }).then(res => res.json())
      .then(result => {
        console.log("deleted from cart");
      }
      )
      .catch(err => {
        console.log("error ==", err)
      })
  }
  if (!state) {
    return <UserLogin />
  } else {
    return (
      <section className="h-30">
        <div className="container py-1">
          <div className="row d-flex justify-content-center align-items-center h-30">
            <div className="col">
              <div className="card card-registration my-4">
                {
                  post ?
                    <div className="row" style={{ height: "40rem" }}>
                      <div className="col-xl-6 d-none d-xl-block">
                        <img
                          src={post.images}
                          alt="Sample photo"
                          className="img-fluid"
                          style={{ borderTopLeftRadius: ".25rem", borderBottomLeftRadius: ".25rem", width: "50rem", height: "40rem" }}
                        />
                      </div>
                      <div className="col-xl-6">
                        <div className="card-body p-md-5 text-black">
                          <h5 className="mb-5 text-uppercase" id="display">{post.name}</h5>
                          <hr />
                          <br />

                          <div className="row">
                            <div className="col-12 mb-3">
                              <div>
                                <h3 id="data">About the product:</h3>
                                <h3>{post.description}</h3>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 mb-3">
                              <h3 id="data">Price:</h3>
                              <h3>Rs. {post.cost}</h3>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 mb-3">
                              <h3 id="data">Quantity:</h3>
                              <h3>{post.quantity}</h3>
                            </div>
                          </div>


                        </div>
                      </div>
                    </div> :
                    <p>Loading...</p>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

    );
  }
}

export default Aftercart;