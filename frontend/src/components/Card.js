import  React, { Component } from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
//import { Card, CardColumns } from "react-bootstrap";

class Card extends Component {
  render(){
   return(
    <div class="card" style={{width: "18rem"}}>
    <img class="card-img-top" src="https://media.istockphoto.com/photos/skillet-biscuits-picture-id1254872126?b=1&k=20&m=1254872126&s=170667a&w=0&h=LmPNhL8iWklQvW0fCyQdYNWg4hqQv9V57XRYCcb7P64=" alt="Card image cap"/>
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
   );
   }
}

export default Card;