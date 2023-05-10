import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import logo from "../../img/logo_thobor_celalalt.png";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__addr">
        <LazyLoadImage
          src={logo}
          alt=""
          width={80}
          height="auto"
          className="footer__logo"
        />

        <h2>Contact</h2>

        <address>
          thoborcnch@gmail.com
          <br />
          <br />
          <a className="footer__btn" href="mailto:thoborcnch@gmail.com">
            Email Us
          </a>
        </address>
      </div>

      <ul className="footer__nav">
        <li className="nav__item">
          <h2 className="nav__title">Our channels</h2>

          <ul className="nav__ul">
            <li>
              <a href="https://www.facebook.com/ThoborCNCH">Facebook</a>
            </li>

            <li>
              <a href="https://www.instagram.com/thoborcnch/">Instagram</a>
            </li>

            <li>
              <a href="https://www.youtube.com/@thobor7033">Youtube</a>
            </li>
          </ul>
        </li>

        <li className="nav__item">
          <h2 className="nav__title">Legal</h2>

          <ul className="nav__ul">
            <li>
              <a href="#">Privacy Policy</a>
            </li>

            <li>
              <a href="#">Terms of Use</a>
            </li>

            <li>
              <a href="#">Sitemap</a>
            </li>
          </ul>
        </li>
      </ul>

      <div className="legal">
        <p> Copyright &copy; 2022 Thobor #RO068 All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
