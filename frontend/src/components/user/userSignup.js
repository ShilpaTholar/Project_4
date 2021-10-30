import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../global.css'
import usersignupImage from '../images/userSignup.PNG'


function UserSignup() {

    const history = useHistory();
    const [address, setaddress] = useState('');
    const [area, setarea] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [name, setname] = useState('');
    const [email, setemail] = useState('');

    const signupuser = (event) => {
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
                name,
                email
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.message) {
                    history.push('/userHome');
                }
            })
    }

    return (
        <div className="container signupcontainer h-100 my-5">
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
                                                <label for="floatingInput">Name</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input type="email" className="form-control" id="floatingInput" onChange={(e) => { setemail(e.target.value) }} value={email} placeholder="name@example.com" />
                                                <label for="floatingInput">Email address</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input type="text" id="floatingInput" className="form-control" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder="password" />
                                                <label for="floatingInput">Password</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3">
                                                <input type="email" className="form-control" id="floatingInput" value={confirmpassword} onChange={(e) => { setconfirmpassword(e.target.value) }} placeholder="comfirm password" />
                                                <label for="floatingInput">Confirm Password</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input type="text" id="floatingInput" className="form-control" value={address} onChange={(e) => { setaddress(e.target.value) }} placeholder="Address" />
                                        <label for="floatingInput">Address</label>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="text" id="floatingInput" className="form-control" value={area} onChange={(e) => { setarea(e.target.value) }} placeholder="Area" />
                                                <label for="floatingInput">Area</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input type="number" id="floatingInput" className="form-control" placeholder="Pincode" />
                                                <label for="floatingInput">Pincode</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mx-auto ms-5 me-5 ">
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
    )
}

export default UserSignup;
