import React, { useContext, useState } from 'react'
import { UserContext } from '../../App'
import { Link, useHistory } from 'react-router-dom'
import '../global.css'


function ShopLogin() {

    const history = useHistory()

    const { state, dispatch } = useContext(UserContext)
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const shoplogin = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/shop/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(result => {
                if (result.token) {
                    localStorage.setItem("user", JSON.stringify(result.user));
                    localStorage.setItem("jwt", result.token);
                    dispatch({ type: "USER", payload: result.user })

                    history.push('/shopHome')
                } else if (result.error) {
                    console.log(result.error)
                }
            })
    }


    return (
        <div class="container col-4 h-200 mt-5">
            <div class="login-block">
                <h1>Log into your account</h1>

                <form>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-envelope ti-email"></i></span>
                            <input type="text" class="form-control" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder="Your email address" />
                        </div>
                    </div>

                    <hr class="hr-xs" />

                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-lock ti-unlock"></i></span>
                            <input type="password" class="form-control" value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder="Choose a password" />
                        </div>
                    </div>

                    <button class="btn btn-primary btn-block" type="submit" onClick={shoplogin}>Log in</button>
                </form>
            </div>

            <div class="login-links">
                <p class="text-center">Dont't have an account? <Link className="txt-brand" to="/shopSignup">Signup</Link></p>
            </div>
        </div>
    )

}

export default ShopLogin