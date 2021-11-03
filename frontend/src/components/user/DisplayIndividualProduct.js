import React from 'react';
import { useState, useEffect } from "react";
import './shop.css';
import { useParams } from 'react-router-dom';
import NavBar from './nav';
import Footer from '../footer';
import Modal from 'react-modal';

const DisplayIndividualProduct = () => {
  const [post, setPost] = useState('');
  const [cartsnapshot, setCartsnapshot] = useState([])
  const [wishlistsnapshot, setWishlistsnapshot] = useState([])
  const [refresh, setrefresh] = useState(false)
  const { id } = useParams();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true)
  }

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

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    fetch(`http://localhost:5000/product/view/${id}`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        setPost(result)
        console.log(result)
      }).catch(err => {
        console.log('errr=', err)
      })

    fetch(`http://localhost:5000/cart/showincrement/${id}`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log("res is", result)
        setCartsnapshot(result)
      }).catch(err => {
        console.log('errr=', err)
      })

    fetch(`http://localhost:5000/wishlist/showremove/${id}`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log("res is", result)
        setWishlistsnapshot(result)
      }).catch(err => {
        console.log('errr=', err)
      })
  }, [refresh])

  const wishlist = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/wishlist/wishlistadd", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        productId: post._id,
      })
    }).then(res => res.json())
      .then(result => {
        console.log("added to wishlist");
        openModal()
        setrefresh(!refresh)
      })
      .catch(err => {
        console.log("error ==", err)
      })
  }

  const addtocart = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/cart/cartadd", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        productId: post._id,
        count: cartsnapshot.length > 0 ? (cartsnapshot[0].count + 1) : 1,
        cartId: cartsnapshot.length > 0 ? cartsnapshot[0]._id : 0,
      })
    }).then(res => res.json())
      .then(result => {
        console.log("added to cart");
        openModal()
        setrefresh(!refresh)
      })
      .catch(err => {
        console.log("error ==", err)
      })
  }

  const removefromWishlist = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/wishlist/delete/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    }).then(res => res.json())
      .then(result => {
        setrefresh(!refresh)
      }
      )
      .catch(err => {
        console.log("error ==", err)
      })
  }


  return (
    <div>
      <NavBar />
      <section style={{ height: "auto" }}>
        <div className="container py-1">
          <div className="row d-flex justify-content-center align-items-center h-30">
            <div className="col">
              <div className="card card-registration my-4">
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
                            <h3 id="data">About the product: </h3>
                            <h3>{post.description}</h3>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <h3 id="data">Price: </h3>
                          <h3>Rs.{post.cost}</h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <h3 id="data">Quantity: </h3>
                          <h3>{post.quantity}</h3>
                        </div>
                      </div>
                      <div className="center-block">
                        {
                          wishlistsnapshot.length > 0 ?
                            <button className="btn btn-danger btn-lg" onClick={removefromWishlist}><i className="fas fa-heart"></i>Remove From Wishlist</button>
                            :
                            <button className="btn btn-info btn-lg" onClick={wishlist}><i className="fas fa-heart"></i>Add To Wishlist</button>
                        }
                        <button className="btn btn-info btn-lg me-3" onClick={addtocart}><i className="fas fa-shopping-cart"></i>Add To Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div className="row">
          <i className="col-1 far fa-times-circle" onClick={closeModal}></i>
          <p className="col-11 lead">Added</p>
        </div>
      </Modal>
      <Footer />

    </div >

  );
}

export default DisplayIndividualProduct;