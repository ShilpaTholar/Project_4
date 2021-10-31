import  React, { useState,useEffect,useContext } from 'react';
import axios from "axios";
import {Container ,Row, Col} from "react-bootstrap";
import './shop.css';
import {useHistory ,Link} from "react-router-dom";
import { UserContext } from '../../App';

function UserHome() {
    const { state, dispatch } = useContext(UserContext)
    const [product, setProduct]=useState('');
    const [post, setPost] =useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    let checkState = (e) =>{
      setProduct(e.target.value)
      console.log(product)
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

    const cart = (event)=> {
      event.preventDefault();
     // console.log("inside")
     // console.log(post._id)
      fetch("http://localhost:5000/ecart/cart/add", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          productId: post._id,
        })
    }).then(res => res.json())
        .then(result => {
           // setPost(result)
            console.log("added to cart");
           // console.log(result)
        } 
        )
        .catch(err => {
            console.log("error ==", err)
        })
    }

    
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
                         <img class="card-img-top" style={{height:"250px"}} src={ele.images} alt="Card image cap"/>
                         <div class="card-img-overlay d-flex justify-content-end">
                          <a href="#" class="card-link text-danger like">
                          </a>
                        </div>
                         <div class="card-body">
                          <h5 class="card-title">{ele.name}</h5>
                          <h5 class="card-title">Rs. {ele.cost}</h5>
                          <div class="buy d-flex justify-content-between align-items-center">
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