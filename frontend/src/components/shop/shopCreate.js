import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import '../global.css'
import UserLogin from '../user/userLogin'

function ShopCreate() {

    const { state, dispatch } = useContext(UserContext)

    const [isClicked, setisClicked] = useState(false);
    const [image, setimage] = useState("");
    const [description, setdescription] = useState("");
    const [cost, setcost] = useState(0);
    const [quantity, setquantity] = useState(0);
    const [name, setname] = useState("");
    const [url, seturl] = useState("")



    useEffect(() => {
        if (url) {
            fetch(`http://localhost:5000/shop/add/${state._id}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    cost,
                    description,
                    quantity,
                    name,
                    images: url
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
    }


    if (!state) {
        return <UserLogin />
    }
    else {
        return (
            <div>
                <p className="display-5 text-center mt-5">Create Your Shop {state.shopName} Online!!</p>
                <div >
                    <form className="container col-6">
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Product Name</label>
                                <input type="text" className="form-control" onChange={(e) => setname(e.target.value)} placeholder="Enter Product Name" />
                            </div>
                            <div className="col">
                                <label className="form-label">Quantity</label>
                                <input type="text" className="form-control" onChange={(e) => setquantity(e.target.value)} placeholder="Enter stock" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Description</label>
                                <input type="text" className="form-control" onChange={(e) => setdescription(e.target.value)} placeholder="Add Decription" />
                            </div>
                            <div className="col">
                                <label className="form-label">Cost</label>
                                <input type="text" className="form-control" onChange={(e) => setcost(e.target.value)} placeholder="const" />
                            </div>
                        </div>
                        <div className="row choosefile mb-3">
                            <label className="form-label">Select images</label>
                            <input onChange={(e) => setimage(e.target.files[0])} className="form-control" type="file" id="formFile" />
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <button className="btn btn-outline-info" onClick={(event) => postimage(event)}>
                                    {
                                        isClicked ?
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            :
                                            <></>
                                    }
                                    Submit!
                                </button>
                            </div>
                            <div className="col">
                                <button className="btn btn-outline-info">
                                    Add More!
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default ShopCreate