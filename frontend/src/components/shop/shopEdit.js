import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../App'
import UserLogin from '../user/userLogin'

function ShopEdit() {

    const { state, dispatch } = useContext(UserContext)
    const [product, setproduct] = useState([])
    var { id } = useParams();

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



    useEffect(() => {
        console.log(state)
        fetch(`http://localhost:5000/shop/getparticularproduct/${id}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                setproduct(result)
            }).catch(err => {
                console.log(err)
            })
    }, [])


    // const productDelete = () => {
    //     fetch(`http://localhost:5000/shop/delete/${deleteId}`, {
    //         method: "delete",
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }).then(res => res.json())
    //         .then(result => {
    //             console.log(result)
    //         })
    // }


    if (!state) {
        return <UserLogin />
    }
    else {
        return (
            <div>
                <p className="display-5 text-center mt-5">Edit Your Shop {state.shopName}</p>
                <div >
                    <form>
                        <div className="row">
                            <div className="col">
                                <label >Product Name</label>
                                <input type="text" className="form-control" placeholder={product.name} />
                            </div>
                            <div className="col">
                                <label >Quantity</label>
                                <input type="text" className="form-control" placeholder={product.quantity} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label >Description</label>
                                <input type="text" className="form-control" placeholder={product.description} />
                            </div>
                            <div className="col">
                                <label >Cost</label>
                                <input type="text" className="form-control" placeholder={product.cost} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label >Images</label>
                                <input type="text" className="form-control" placeholder={product.images} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ShopEdit