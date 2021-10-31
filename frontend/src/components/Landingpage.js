import  React, { Component } from 'react';
import './landinpagecss.css';



class Landingpage extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        images: [
            "https://images.unsplash.com/photo-1533745848184-3db07256e163?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2VsY29tZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHNob3AlMjBvbmxpbmV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          "https://images.unsplash.com/photo-1591030434469-3d78c7b17820?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8b25saW5lJTIwc2hvcHBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
          "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/desert.jpg",
          "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/mountains.jpg",
          "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/redsky.jpg",
          "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/sandy-shores.jpg",
          "https://s3.us-east-2.amazonaws.com/dzuz14/thumbnails/tree-of-life.jpg"
        ],
        currentIndex: 0,
        translateValue: 0
      }
    }
  
    goToPrevSlide = () => {
      if(this.state.currentIndex === 0)
        return;
      
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex - 1,
        translateValue: prevState.translateValue + this.slideWidth()
      }))
    }
  
    goToNextSlide = () => {
      // Exiting the method early if we are at the end of the images array.
      // We also want to reset currentIndex and translateValue, so we return
      // to the first image in the array.
      if(this.state.currentIndex === this.state.images.length - 1) {
        return this.setState({
          currentIndex: 0,
          translateValue: 0
        })
      }
      
      // This will not run if we met the if condition above
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1,
        translateValue: prevState.translateValue + -(this.slideWidth())
      }));
    }
  
    slideWidth = () => {
       return document.querySelector('.slide').clientWidth
    }
  
    render() {
      return (
          <div>
        <div className="slider">
  
          <div className="slider-wrapper"
            style={{
              transform: `translateX(${this.state.translateValue}px)`,
              transition: 'transform ease-out 0.45s'
            }}>
              {
                this.state.images.map((image, i) => (
                  <Slide key={i} image={image} />
                ))
              }
          </div>
  
          <LeftArrow
           goToPrevSlide={this.goToPrevSlide}
          />
  
          <RightArrow
           goToNextSlide={this.goToNextSlide}
          />
        </div>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />

<div id="page-wrapper">
  <header id="header">
    <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light" id="nav">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">ShopEase</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" onClick={() => history.push('/userSignup')}>Signup</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => history.push('/UserLogin')}>Login</a>
                </li>
              </ul>
              
            </div>
          </div>
        </nav>
    </div>
  </header>
  <main class="container" id="hero">
    <h1 class="title">We offer the best services</h1>
    <section class="features" id="features">
      <div class="grid">
        <div class="icon"><i class="fa fa-3x fa-fire"></i></div>
        <div class="desc">
          <h2>Customer services</h2>
          <p>We make sure you recieve your product as soon as we have finished making it. We also provide free returns if you are not satisfied.
          </p>
        </div>
      </div>
      <div class="grid">
        <div class="icon"><i class="fa fa-3x fa-truck"></i></div>
        <div class="desc">
          <h2>Fast Shipping</h2>
          <p>We make sure you recieve your product as soon as we have finished making it. We also provide free returns if you are not satisfied.</p>
        </div>
      </div>
      <div class="grid">
        <div class="icon"><i class="fa fa-3x fa-battery-full" aria-hidden="true"></i></div>
        <div class="desc">
          <h2>Quality Assurance</h2>
          <p>For every purchase you make, we will ensure there are no damages or faults and we will check and test the product.</p>
        </div>
      </div>
    </section>
  </main>
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
        </div>
        </div>
      );
    }
  }
  
  
  const Slide = ({ image }) => {
    const styles = {
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 60%'
    }
    return <div className="slide" style={styles}></div>
  }
  
  
  const LeftArrow = (props) => {
    return (
      <div className="backArrow arrow" onClick={props.goToPrevSlide}>
        <i className="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
      </div>
    );
  }
  
  
  const RightArrow = (props) => {
    return (
      <div className="nextArrow arrow" onClick={props.goToNextSlide}>
        <i className="fa fa-arrow-right fa-2x" aria-hidden="true"></i>
      </div>
    );
  }
export default Landingpage