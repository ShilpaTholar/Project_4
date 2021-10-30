import  React, { useState,useEffect } from 'react';
import axios from "axios";
import {Container ,Row, Col} from "react-bootstrap";
import './shop.css';
import {useHistory ,Link} from "react-router-dom";

function UserHome() {
    const [product, setProduct]=useState('');
    const [post, setPost] =useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    let checkState = (e) =>{
      setProduct(e.target.value)
      console.log(product)
    }

    function filter(val){
      if (val==1){
        console.log("clicked");
      }
    }

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
      const baseUrl= `http://localhost:5000/shop/display/${product}`;
      axios.get(baseUrl).then((response) => {
      setPost(response.data);   
      setLoading(false);    
      console.log(response.data);
     });

   }

   function  displayProduct(id){
      console.log(id);
      history.push(`/DisplayProduct`)
   }

   let ele = "";
   if(true) {
     ele = <div></div>;
   }
        return(
          <><nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Hello Username</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">MyCart</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Wishlist</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    FilterByPrice
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#" value="1">HightoLow</a></li>
                    <li><a className="dropdown-item" href="#" value="2">LowToHigh</a></li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="search" onChange={checkState} placeholder="Search" aria-label="Search" required/>
                <button className="btn btn-outline-success" onClick={handleClick} type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
            <Container>
                <Row>
                  { 
                     loading ? <div>Loading.....</div> : 
                     post && post.length > 0 ? post.map((ele, i) => 
                      <Col sm={3} key = {'product-'+i}>
                      <br/>
                      <Link to={"/DisplayProduct/"+ ele._id}>
                      <div class="card" style={{width: "18rem"}}>
                         <img class="card-img-top" src={ele.images} alt="Card image cap"/>
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
                      </Link>
                      </Col>
                     ) :<div class="row">
                        <div class="span12">
                        <div class="alert alert-info">No products found</div>
                        </div>
                        </div>
                         
                  }    
              </Row>
                   
            </Container>
      
        </>
        )
}

export default UserHome