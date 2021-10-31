import React, { useState, useEffect } from 'react';
import axios from "axios";
import './shop.css';
import { useHistory, Link } from "react-router-dom";
import NavBar from './nav';

function UserHome() {
  const [product, setProduct] = useState('');
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedState, setCheckedState] = useState(new Array(5).fill(false))
  const filters = ['Ration', 'Desserts', 'Cloths', 'Cosmetics']
  const [hasfilters, sethasfilters] = useState([]);
  const history = useHistory();


  useEffect(() => {
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

  }, [])


  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    const baseUrl = `http://localhost:5000/shop/display/${product}`;
    axios.get(baseUrl).then((response) => {
      setPost(response.data);
      setLoading(false);
      console.log(response.data);
    });

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
  return (
    <>
      <NavBar></NavBar>
      <div className="row">
        <div className="col-3 p-5">
          <p className="lead">Apply Filters</p>
          <div className="myfilters">
            <div className="filterNames">
              {filters.map((name, index) => {
                return (
                  <div className="row">
                    <p >
                      <label>
                        <input className="form-check-input" type="checkbox" checked={checkedState[index]} onChange={() => handleOnChange(index)} />
                        <span style={{ color: "#3C096C" }}>{name}</span>
                      </label>
                    </p>
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
                        <div class="card" style={{ width: "90%" }}>
                          <img class="card-img-top" style={{ width: "100%", height: "150px" }} src={ele.images} alt="Card image cap" />
                          <div class="card-img-overlay d-flex justify-content-end">
                            <a href="#" class="card-link text-danger like">
                              <i class="fas fa-heart"></i>
                            </a>
                          </div>
                          <div class="card-body">
                            <h5 class="card-title">{ele.name}</h5>
                            <div class="buy d-flex justify-content-between align-items-center">
                              <div class="price text-info"><h5 class="mt-4">Rs. {ele.cost}</h5></div>
                              <a href="#solo" class="btn btn-info mt-3"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                  :
                  hasfilters.map((ele, i) => {
                    return (
                      <div className="col-4" key={'product-' + i}>
                        <div class="card" style={{ width: "90%" }}>
                          <img class="card-img-top" style={{ width: "100%", height: "150px" }} src={ele.images} alt="Card image cap" />
                          <div class="card-img-overlay d-flex justify-content-end">
                            <a href="#" class="card-link text-danger like">
                              <i class="fas fa-heart"></i>
                            </a>
                          </div>
                          <div class="card-body">
                            <h5 class="card-title">{ele.name}</h5>
                            <div class="buy d-flex justify-content-between align-items-center">
                              <div class="price text-info"><h5 class="mt-4">Rs. {ele.cost}</h5></div>
                              <a href="#solo" class="btn btn-info mt-3"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
            }
          </div>
        </div>

      </div>

    </>
  )
}

export default UserHome