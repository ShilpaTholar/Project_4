import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'
import UserLogin from '../user/userLogin';
import Modal from 'react-modal';

function ShopUpdate() {

    const { state, dispatch } = useContext(UserContext)
    const [allproducts, setallproducts] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState("")


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function openModal(id) {
        console.log(id)
        setDeleteId(id)
        setIsOpen(true)
    }

    function closeModal(shouldreset) {
        if (shouldreset) {
            setDeleteId("")
        }
        setIsOpen(false)
    }


    useEffect(() => {
        console.log("state is", state);
        if (state) {
            fetch(`http://localhost:5000/shop/products/${state._id}`, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }).then(res => res.json())
                .then(result => {
                    setallproducts(result)
                }).catch(err => {
                    console.log(err)
                })
        }

    }, [state])


    const productDelete = () => {
        fetch(`http://localhost:5000/shop/delete/${deleteId}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
            })
    }


    if (!state) {
        return <UserLogin />
    }
    else {
        return (
            <div>
                <p className="display-5 text-center mt-5">Update Your Shop {state.shopName}</p>
                <div className="row justify-content-center">
                    <table style={{ width: "70%" }} className="table table-hover table-info">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                allproducts.map((item, key) => {
                                    return (
                                        <tr>
                                            <td>{key}</td>
                                            <td>{item.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.cost}</td>
                                            <td>
                                                <div className="row justify-content-start">
                                                    <div className="col-4 p-0">
                                                        <button className="btn btn-outline-danger" onClick={() => openModal(item._id)}>
                                                            <i className="far fa-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                    <div className="col-4 p-0">
                                                        <Link to={"/shopEdit/" + item._id} className="btn btn-outline-info">
                                                            <i className="far fa-edit"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })


                            }
                        </tbody>
                    </table>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <div className="row">
                            <p className="col-11 lead">Do you want to Delete this product?</p>
                            <i className="col-1 far fa-times-circle" onClick={closeModal}></i>
                        </div>
                        <hr></hr>
                        <div className="row">
                            <button className="btn btn-danger col-4 m-2" onClick={() => productDelete()}>Yes</button>
                            <button className="btn btn-outline-success col-4 m-2" onClick={() => closeModal(true)}>No</button>
                        </div>
                    </Modal>

                </div>
            </div>
        )
    }
}

export default ShopUpdate