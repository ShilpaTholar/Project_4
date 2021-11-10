import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../global.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import usersignupImage from '../images/userSignup.PNG'


function UserSignup() {

    const history = useHistory();
    const [address, setaddress] = useState('');
    const [shopName, setshopname] = useState('');
    const [area, setarea] = useState('');
    const [password, setpassword] = useState('');
    const [hasShop, sethasShop] = useState(false)
    const [confirmpassword, setconfirmpassword] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');

    const signupuser = (event) => {
        console.log("hasShop", hasShop)
        event.preventDefault();
        fetch('http://localhost:5000/user/signup', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                address,
                area,
                password,
                confirmpassword,
                name,
                email,
                hasShop,
                shopName
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.message) {
                    history.push('/userHome');
                } else if (result.error) {
                    toast.error(result.error, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
    }

    return (
        <>
            <div className="container signupcontainer h-220 my-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col ps-0 pe-0">
                        <div className="card card-registration ">
                            <div className="row g-0">
                                <div className="col-xl-6 d-none d-xl-block">
                                    <img
                                        src={usersignupImage}
                                        alt="Sample photo"
                                        className="img-fluid"
                                        style={{ borderTopLeftRadius: ".25rem", borderBottomLeftRadius: ".25rem" }}
                                    />
                                </div>
                                <div className="col-xl-6">
                                    <div className="card-body ps-5 pt-5 mb-0 pe-5 text-black">
                                        <h3 className="mb-5">Sign in to ShopEase</h3>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="text" id="floatingInput" value={name} onChange={(e) => { setname(e.target.value) }} className="form-control" placeholder="name" />
                                                    <label htmlFor="floatingInput">Name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="email" className="form-control" id="floatingInput" onChange={(e) => { setemail(e.target.value) }} value={email} placeholder="name@example.com" />
                                                    <label htmlFor="floatingInput">Email address</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="password" id="floatingInput" className="form-control" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder="password" />
                                                    <label htmlFor="floatingInput">Password</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input type="password" className="form-control" id="floatingInput" value={confirmpassword} onChange={(e) => { setconfirmpassword(e.target.value) }} placeholder="comfirm password" />
                                                    <label htmlFor="floatingInput">Confirm Password</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-floating mb-3">
                                            <input type="text" id="floatingInput" className="form-control" value={address} onChange={(e) => { setaddress(e.target.value) }} placeholder="Address" />
                                            <label htmlFor="floatingInput">Address</label>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <div className="form-floating mb-3">
                                                    <input type="text" id="floatingInput" className="form-control" value={area} onChange={(e) => { setarea(e.target.value) }} placeholder="Area" />
                                                    <label htmlFor="floatingInput">Area</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <div className="form-check">
                                                        <input className="form-check-input" onChange={(e) => sethasShop(e.target.checked)} type="checkbox" value="" id="flexCheckDefault" />
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                            Do you Have a Shop?
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" id="floatingInput" value={shopName} onChange={(e) => { setshopname(e.target.value) }} placeholder="Shop name" />
                                                    <label htmlFor="floatingInput">Shop name</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mx-auto ms-5 me-5 mb-5">
                                        <button onClick={signupuser} className=" col-md-4 btn btn-info btn-outline">Sign up</button>
                                        <p className="col-md-4 lead">OR</p>
                                        <Link to="/userLogin" className="btn btn-outline-info col-md-4">Login</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ToastContainer />
        </>
    )
}

export default UserSignup;
