import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory } from 'react-router-dom'
import '../global.css'


function UserLogin() {

    const history = useHistory()

    const { state, dispatch } = useContext(UserContext)
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const userlogin = (event) => {
        event.preventDefault();
        fetch("http://localhost:5000/user/login", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => res.json())
            .then(result => {
                if (result.token) {
                    localStorage.setItem("user", JSON.stringify(result.user));
                    localStorage.setItem("jwt", result.token);
                    dispatch({ type: "USER", payload: result.user })
                    toast.success('Welcome back!! <3', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    history.push('/userHome')
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
            }).catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <div className="container col-4 h-200 mt-5">
                <div className="login-block">
                    <h1>Log into your account</h1>

                    <form>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-envelope ti-email"></i></span>
                                <input type="text" className="form-control" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="Your email address" />
                            </div>
                        </div>

                        <hr className="hr-xs" />

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock ti-unlock"></i></span>
                                <input type="password" className="form-control" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder="Choose a password" />
                            </div>
                        </div>

                        <button className="btn btn-primary btn-block" type="submit" onClick={userlogin}>Log in</button>
                    </form>
                </div>

                <div className="login-links">
                    <p className="text-center">Dont't have an account? <Link className="txt-brand" to="/userSignup">Signup</Link></p>
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

export default UserLogin