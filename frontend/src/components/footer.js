import  React, { Component } from 'react';


function footer(){
    return(
    <div classname="footer" style={{backgroundColor:"#15ade9"}}>
    <br/>
    <div class="credit">
      <br/>
      <p id="connect">Connect with us</p>
      <div class="rounded-social-buttons">
                    <a class="social-button facebook" href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a class="social-button twitter" href="https://www.twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a class="social-button linkedin" href="https://www.linkedin.com/" target="_blank"><i class="fab fa-linkedin"></i></a>
                    <a class="social-button youtube" href="https://www.youtube.com/" target="_blank"><i class="fab fa-youtube"></i></a>
                    <a class="social-button instagram" href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a>
                </div>
                <p classname="text-center" id="connect">Copyright 2021</p>
  </div>
</div>
    )

}
export default footer;