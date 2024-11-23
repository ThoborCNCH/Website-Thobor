import React from "react";
import { Link } from "react-router-dom";
import "./notfound.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import error404Image from '../../images/error404.png';
import sleepRobot from '../../images/sleepRobotNormal.png';
import moon from '../../images/moon404.png';
import earth from '../../images/earthRobots.png';
import rocket from '../../images/rocket.png';

function NotFound() {
  return (
    <>
      <div className="central-body">
        <LazyLoadImage
          className="image-404"
          src={error404Image}
          width="400px"
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
          src={rocket}
          width="40px"
        />
        <div className="earth-moon">
          <LazyLoadImage
            className="object_earth"
            src={earth}
            width="150px"
          />
          <LazyLoadImage
            className="object_moon"
            src={moon}
            width="80px"
          />
        </div>
        <div className="box_astronaut">
          <LazyLoadImage
            className="object_astronaut"
            src={sleepRobot}
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
