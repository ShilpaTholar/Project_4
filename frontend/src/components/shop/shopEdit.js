import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../App'
import UserLogin from '../user/userLogin'

function ShopEdit() {

    const { state, dispatch } = useContext(UserContext)
    const [product, setproduct] = useState([])
    const [isClicked, setisClicked] = useState(false);
    const [image, setimage] = useState("");
    const [description, setdescription] = useState("");
    const [cost, setcost] = useState(0);
    const [quantity, setquantity] = useState(0);
    const [name, setname] = useState("");
    const [url, seturl] = useState("")

    var { id } = useParams();



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
                console.log(result)
            }).catch(err => {
                console.log(err)
            })

        if (url) {
            fetch(`http://localhost:5000/shop/update/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    cost: cost ? cost : product[0].cost,
                    description: description ? description : product[0].description,
                    quantity: quantity ? quantity : product[0].quantity,
                    name: name ? name : product[0].name,
                    images: url ? url : product[0].images
                })
            }).then(res => res.json())
                .then(result => {
                    setisClicked(false)
                    console.log(result)
                })
                .catch(err => {
                    console.log("error ==", err)
                })
        }
    }, [url])

    const postimage = (event) => {
        event.preventDefault()
        setisClicked(true)
        if (image != "") {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "shopEase");
            data.append("cloud_name", "doihhodwk");
            fetch("https://api.cloudinary.com/v1_1/doihhodwk/image/upload", {
                method: "post",
                body: data
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    seturl(data.url)
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            fetch(`http://localhost:5000/shop/update/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    cost: cost ? cost : product[0].cost,
                    description: description ? description : product[0].description,
                    quantity: quantity ? quantity : product[0].quantity,
                    name: name ? name : product[0].name,
                    images: product[0].images
                })
            }).then(res => res.json())
                .then(result => {
                    setisClicked(false)
                    console.log(result)
                })
                .catch(err => {
                    console.log("error ==", err)
                })
        }

    }


    if (!state) {
        return <UserLogin />
    }
    else {
        return (
            <div>
                <p className="display-5 text-center mt-5">Edit Your Shop {state.shopName}</p>
                <div className="container col-6 shopCreateForm">
                    <form>
                        <div className="row">
                            <div className="col">
                                <label >Product Name</label>
                                <input type="text" className="form-control" placeholder={product[0] ? product[0].name : ''} onChange={(event) => { setname(event.target.value) }} />
                            </div>
                            <div className="col">
                                <label >Quantity</label>
                                <input type="text" className="form-control" placeholder={product[0] ? product[0].quantity : ''} onChange={(event) => { setquantity(event.target.value) }} />
                            </div>
                        </div>
                        <div className="row  mb-3">
                            <div className="col">
                                <label >Description</label>
                                <input type="text" className="form-control" placeholder={product[0] ? product[0].description : ''} onChange={(event) => { setdescription(event.target.value) }} />
                            </div>
                            <div className="col">
                                <label >Cost</label>
                                <input type="text" className="form-control" placeholder={product[0] ? product[0].cost : ''} onChange={(event) => { setcost(event.target.value) }} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col choosefile">
                                <label className="form-label">Select images</label>
                                <input onChange={(e) => setimage(e.target.files[0])} className="form-control" type="file" id="formFile" />
                                {
                                    product[0] ?
                                        <img style={{ width: "200px", height: "150px" }} alt="product image" src={product[0].images} />
                                        :
                                        <p>Loading Image...</p>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-outline-info" onClick={(event) => postimage(event)}>
                                    {
                                        isClicked ?
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            :
                                            <></>
                                    }
                                    Edit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ShopEdit