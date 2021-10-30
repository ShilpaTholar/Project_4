import  React, { Component } from 'react';
import { useState,useEffect } from "react";
import './shop.css';

function Landingpage(){
    return(
      <div>
     <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://static.vecteezy.com/system/resources/previews/001/432/129/non_2x/free-delivery-logo-with-courier-free-vector.jpg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://seeklogo.com/images/F/free-delivery-logo-3F8F5B428D-seeklogo.com.png" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgPoWTWAhLHlEmrNtdzw3gX_xhtaCyVx4a1A&usqp=CAU" class="d-block w-100" alt="..."/>
    </div>
  </div>
</div>
      </div>
       
    )
}

export default Landingpage;