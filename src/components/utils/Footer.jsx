import React from 'react'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__addr">
      <img src={require("../../img/logo_thobor_celalalt.png")} alt="" className="footer__logo" />
        {/* <h1 className="footer__logo">Thobor</h1> */}

      <h2>Contact</h2>

      <address>
        thoborcnch@gmail.com
        <br />
        <br />
        <a
          className="footer__btn"
          href="mailto:thoborcnch@gmail.com"
        >
          Email Us
        </a>
      </address>
    </div>

    <ul className="footer__nav">
      <li className="nav__item">
        <h2 className="nav__title">Our channels</h2>

        <ul className="nav__ul">
          <li>
            <a href="https://www.facebook.com/ThoborCNCH">
              Facebook
            </a>
          </li>

          <li>
            <a href="https://www.instagram.com/thoborcnch/">
              Instagram
            </a>
            </li>
            
          <li>
              <a href="https://www.youtube.com/@thobor7033">
                Youtube
            </a>
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

      {/* <div className="legal__links">
        <span>
          Editors Matei <span className="heart">&</span> Mihail
        </span>
      </div> */}
    </div>
  </footer>
  )
}

export default Footer