import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import './shop.css';
import { useHistory, Link } from "react-router-dom";
import NavBar from './nav';
import UserLogin from './userLogin';
import { UserContext } from '../../App'
import Footer from '../footer';

function UserHome() {
  const [product, setProduct] = useState('');
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedState, setCheckedState] = useState(new Array(5).fill(false))
  const filters = ['Ration', 'Desserts', 'Cloths', 'Cosmetics']
  const [hasfilters, sethasfilters] = useState([]);
  const [search, setsearch] = useState("")
  const [showCustom, setshowCustom] = useState(false);
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);


  useEffect(() => {


    if (showCustom) {
      fetch('http://localhost:5000/shop/custom', {
        method: 'get',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      }).then(res => res.json())
        .then(result => {
          setPost(result)
          console.log(result)
        }).catch(err => {
          console.log('errr=', err)
        })
    } else {
      fetch('http://localhost:5000/shop/display', {
        method: 'get',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      }).then(res => res.json())
        .then(result => {
          setPost(result)
          console.log(result)
        }).catch(err => {
          console.log('errr=', err)
        })
    }


  }, [showCustom])


  const handleClick = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/shop/display/${search}`, {
      method: 'get',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        setPost(result)
        console.log(result)
      }).catch(err => {
        console.log('errr=', err)
      })

  }

  function applyfilter() {
    var x1 = []
    checkedState.filter((item1, index) => {
      if (item1) {
        post.filter(item => {
          if (item.productType == filters[index] || item.description.includes(filters[index].toLowerCase()) || item.name == filters[index]) {
            x1.push(item)
          }
        })
        sethasfilters(x1)
      }
    })
  }

  const customView = () => {
    setshowCustom(true)
  }

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  let ele = "";
  if (true) {
    ele = <div></div>;
  }
  if (!state) {
    return <UserLogin />
  } else {
    return (
      <>
        <NavBar></NavBar>

        <div className="row">
          <div className="col-3 p-5">
            <button className="btn btn-info mb-2" onClick={customView}>Show Custom View</button>
            <form className="row">
              <input type="text" className="form-control col-10" style={{ width: "150px" }} onChange={(e) => { setsearch(e.target.value) }} placeholder="search products..." />
              <input className="btn btn-info col-2" type="submit" value="Go!" onClick={handleClick} />
            </form>
            <p className="lead mt-4">Apply Filters</p>
            <div className="myfilters">
              <div className="row">
                {filters.map((name, index) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col-2">
                        <label>
                          <input className="form-check-input" type="checkbox" checked={checkedState[index]} onChange={() => handleOnChange(index)} />
                        </label>
                      </div>
                      <div className="col-10">
                        <p>{name}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <button className="btn btn-info" onClick={applyfilter}>Apply</button>

            </div>
          </div>
          <div className="col-9">
            <div className="row">
              {
                loading ? <div>Loading.....</div> :
                  (post && post.length > 0 && hasfilters.length == 0) ?
                    post.map((ele, i) => {

                      return (

                        <div className="col-4" key={'product-' + i}>
                          <Link to={"/DisplayProduct/" + ele._id}>
                            <br></br>
                            <div className="card" style={{ width: "90%" }}>
                              <img className="card-img-top" style={{ width: "100%", height: "150px" }} src={ele.images} alt="Card image cap" />
                              <div className="card-body">
                                <h5 className="card-title">{ele.name}</h5>
                                <div className="buy d-flex justify-content-between align-items-center">
                                  <div className="price text-info"><h5 className="mt-4">Rs. {ele.cost}</h5></div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>

                      )
                    })
                    :
                    hasfilters.map((ele, i) => {
                      return (

                        <div className="col-4" key={'product-' + i}>
                          <Link to={"/DisplayProduct/" + ele._id}>
                            <br></br>
                            <div className="card" style={{ width: "90%" }}>
                              <img className="card-img-top" style={{ width: "100%", height: "150px" }} src={ele.images} alt="Card image cap" />
                              <div className="card-body">
                                <h5 className="card-title">{ele.name}</h5>
                                <div className="buy d-flex justify-content-between align-items-center">
                                  <div className="price text-info"><h5 className="mt-4">Rs. {ele.cost}</h5></div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>

                      )
                    })
              }
            </div>
          </div>

        </div>
        <Footer />
      </>
    )
  }
}

export default UserHome