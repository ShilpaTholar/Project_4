import React, { useContext } from 'react'
import { UserContext } from '../../App';
import { useHistory, Link } from "react-router-dom";


function NavBar() {

    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Hello {state.name}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" onClick={() => history.push('/Cart')}>MyCart</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" onClick={() => history.push('/wishlist')}>Wishlist</a>
                        </li>
                        {
                            state.shopName ?
                                <></>
                                :
                                <></>
                        }
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default NavBar