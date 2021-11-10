import React, { useContext } from 'react'
import { UserContext } from '../../App';
import { useHistory, Link } from "react-router-dom";
import UserLogin from './userLogin';


function NavBar() {

    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault()
        localStorage.clear()
        dispatch({ type: "CLEAR" })
        history.push('/userLogin')
    }

    if (!state) {
        return <UserLogin />

    } else {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {
                            state.shopName ?
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link to="/shopCreate" className="nav-link active" aria-current="page" style={{ color: "#0dcaf0" }}>Add Products</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/shopUpdate" className="nav-link active" style={{ color: "#0dcaf0" }}>Update Products</Link>
                                    </li>
                                </ul> :
                                <ul className="nav navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/userHome"><i style={{ color: "#0dcaf0" }} className="fas fa-home"></i></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/Cart"><i style={{ color: "#0dcaf0" }} className="fas fa-shopping-cart"></i></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/wishlist"><i style={{ color: "#0dcaf0" }} className="fas fa-heart"></i></Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link active" to="/userProfile"><i style={{ color: "#0dcaf0" }} className="fas fa-user"></i></Link>
                                    </li>
                                    <li>
                                        <Link className="nav-link active" onClick={logout}><i style={{ color: "#0dcaf0" }} className="fas fa-sign-out-alt"></i></Link>
                                    </li>
                                </ul>

                        }
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/userHome"><i style={{ color: "#0dcaf0" }} className="fas fa-home"></i></Link>
                            </li>
                            <li>
                                <Link className="nav-link active" to="/userProfile"><i style={{ color: "#0dcaf0" }} className="fas fa-user"></i></Link>
                            </li>
                            <li>
                                <Link className="nav-link active" onClick={logout}><i style={{ color: "#0dcaf0" }} className="fas fa-sign-out-alt"></i></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default NavBar