import React from "react";
import { Link } from "react-router-dom";


import './home.css';

import headshot from './../assets/home/headshot.jpg';
import bg_main from './../assets/home/home-bg-main.jpg';
import bg_portfolio from './../assets/home/home-bg-portfolio.jpg';
import bg_tripreport from './../assets/home/home-bg-trip-report.jpg';
import bg_photography from './../assets/home/home-bg-photography.jpg';

export default class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currBackground: null,
    }
  }

  componentDidMount() {
    this.ele_backgroundImgArr = document.querySelectorAll('img.background-img');
  }

  // routes to appropriate section
  goToSection(e) {
    let section = e.currentTarget.getAttribute('data-bg');
    // TODO: navigate
  }
  
  // on btn hover change bg 
  changeBgToSection(e) {
    let section = e.currentTarget.getAttribute('data-bg');
    this.ele_backgroundImgArr.forEach((img) => {
      if (img.dataset.bg === section) {
        img.style['opacity'] = 1;
      } else {
        img.style['opacity'] = 0;
      }
    });
  }
  
  // on btn hover leave, revert background to main
  changeBgOriginal(e) {
    this.ele_backgroundImgArr.forEach((img) => {
      if (img.dataset.bg !== 'main') {
        img.style['opacity'] = 0;
      } else {
        img.style['opacity'] = 1;
      }
    });
  }

  render() {
    return (
      <div id="home-theme" className="aligner-container">
        <img data-bg="main" className="background-img" src={bg_main} />
        <img data-bg="portfolio" style={{opacity:0}} className="background-img" src={bg_portfolio} />
        <img data-bg="photography" style={{opacity:0}} className="background-img" src={bg_photography} />
        <img data-bg="tripreports" style={{opacity:0}} className="background-img" src={bg_tripreport} />
        <div className="row">
          <div className="col-md-offset-4"></div>
          <div className="col-md-4">
            <div className="contact-card card">
              <div className="row">
                <div className="col-md-6 py-2">
                  <img className="img-fluid headshot d-block mx-auto" src={headshot} />
                </div>
                <div className="col-md-6 aligner-container custom-justify py-2">
                  <div>
                    <span className="name-style">alec ng</span>
                    <br/>
                    <i className="orange fas fa-location-arrow"></i>&nbsp;&nbsp;Vancouver, Canada 
                    <br/>
                    <i className="orange fas fa-envelope"></i><a href="mailto:alecng94@gmail.com">&nbsp;&nbsp;alecng94@gmail.com</a>
                    <br/>
                    <i className="orange fas fa-briefcase"></i><a target="_blank" href="https://www.linkedin.com/in/alecng">&nbsp;&nbsp;LinkedIn</a>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <hr/>
              </div>
              <div className="row">
                <div className="col-sm-4 col-xs-12 text-center p-0">
                  <button className="section-btn" 
                          type="button" 
                          data-bg="portfolio"
                          onClick={(e) => this.goToSection(e)} 
                          onMouseOver={(e) => this.changeBgToSection(e)}
                          onTouchStart={(e) => this.changeBgToSection(e)}
                          onMouseOut={(e) => this.changeBgOriginal(e)}
                          onTouchEnd={(e) => this.changeBgOriginal(e)}>
                    <Link to="/portfolio">Portfolio</Link>
                  </button>
                </div>
                <div className="col-sm-4 col-xs-12 text-center p-0">
                <button className="section-btn" 
                          type="button" 
                          data-bg="photography"
                          onClick={(e) => this.goToSection(e)} 
                          onMouseOver={(e) => this.changeBgToSection(e)}
                          onTouchStart={(e) => this.changeBgToSection(e)}
                          onMouseOut={(e) => this.changeBgOriginal(e)}
                          onTouchEnd={(e) => this.changeBgOriginal(e)}>
                    <Link to="/photography">Photography</Link>
                  </button>
                </div>
                <div className="col-sm-4 col-xs-12 text-center p-0">
                <button className="section-btn" 
                          type="button" 
                          data-bg="tripreports"
                          onClick={(e) => this.goToSection(e)} 
                          onMouseOver={(e) => this.changeBgToSection(e)}
                          onTouchStart={(e) => this.changeBgToSection(e)}
                          onMouseOut={(e) => this.changeBgOriginal(e)}
                          onTouchEnd={(e) => this.changeBgOriginal(e)}>
                    <Link to="/blog">Blog</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}