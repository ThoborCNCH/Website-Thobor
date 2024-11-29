import React from "react";
import { Link } from "react-router-dom";
import facebookImage from "../../img/footer/facebook.png"
import instagramImage from "../../img/footer/instagram.png"
import youtubeImage from "../../img/footer/youtube.png"
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__addr">
        <div className="legal">
          <p> Copyright &copy; 2022 Thobor #RO068 All rights reserved.</p>
          <ul className="nav__ul">
            <li>
              <Link to="/privacyPolicy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/termsAndConditions">Terms and Conditions</Link>
            </li>
          </ul>
        </div>
      </div>

          <ul className="nav__ul">
            <li>
              <a className="footer__btn" href="mailto:contact@thobor-team.com"> Email Us </a>
            </li>
            <li>
              <a href="https://www.facebook.com/ThoborCNCH"><img src={facebookImage} alt="Facebook"/></a>
            </li>

            <li>
              <a href="https://www.instagram.com/thoborcnch/"><img src={instagramImage} alt="instagram"/></a>
            </li>

            <li>
              <a href="https://www.youtube.com/@thobor7033"><img src={youtubeImage} alt="Youtube"/></a>
            </li>
          </ul>

    </footer>
  );
}

export default Footer;
