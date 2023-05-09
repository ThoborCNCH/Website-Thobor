import React from "react";
import { Link } from "react-router-dom";
import "./notfound.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
    
function NotFound() {
  return (
    <>
      <div className="central-body">
        <LazyLoadImage
          className="image-404"
          src="http://salehriaz.com/404Page/img/404.svg"
          width="300px"
        />
        <Link
          to="/"
          className="btn-go-home"
        >
          GO BACK HOME
        </Link>
      </div>
      <div className="objects">
        <LazyLoadImage
          className="object_rocket"
          src="http://salehriaz.com/404Page/img/rocket.svg"
          width="40px"
        />
        <div className="earth-moon">
          <LazyLoadImage
            className="object_earth"
            src="http://salehriaz.com/404Page/img/earth.svg"
            width="100px"
          />
          <LazyLoadImage
            className="object_moon"
            src="http://salehriaz.com/404Page/img/moon.svg"
            width="80px"
          />
        </div>
        <div className="box_astronaut">
          <LazyLoadImage
            className="object_astronaut"
            src="http://salehriaz.com/404Page/img/astronaut.svg"
            width="140px"
          />
        </div>
      </div>
      <div className="glowing_stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
    </>
  );
}

export default NotFound;
