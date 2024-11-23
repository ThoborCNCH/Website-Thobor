import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { useRef } from "react";
import useWindowSize from "./WindowSize";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MagicText from "./MagicText.jsx"

import './styles/_navbar.scss';

function Navbar() {
  const { pathname } = useLocation();
  const nav = useRef(null);

  const size = useWindowSize();
  const nav_click = () => {
    $("nav ul").slideToggle();
    nav.current.classList.toggle("active");
  };

  useEffect(() => {
    const ul = document.querySelector("nav ul");
    if (size.width >= 799) {
    } else {
      if (ul.style.display !== "block") {
      }
    }
  }, [size]);

  useEffect(() => {
    if (size.width <= 799) {
      const ul = document.querySelector("nav ul");
      nav.current.classList.remove("active");
      ul.style.display = "none";
    }
    window.scrollTo(0, 0);
  }, [pathname, size.width]);

  const d = new Date();
  return (
    <section className="navigation">
      <div id="nav-container">
        <div className="brand">
          <LazyLoadImage src={logo} alt="logo" className="logo"/>
          <div className="headers">
            <h1 className = "shadowText"><b>Thobor</b></h1>
            <h1 className = "shadowText"><b>Ro068 | 17871</b></h1>
          </div>
        </div>
        <nav>
          <div className="nav-mobile">
            <button type="button" id="nav-toggle" href="#!" onClick={nav_click} ref={nav}>
              <span />
            </button>
          </div>
          <ul className="nav-list" >
            <li>
              <Link className="headerButton shadowText" to="/">Acasă</Link>
            </li>
            <li>
              <Link className="headerButton shadowText" to={"/pentruSponsori"} >Ajută-ne!</Link>
            </li>
            {
              d.getMonth() === 9 &&
              <li>
                <Link className="headerButton shadowText" to="/recrutari">Recrutari</Link>
              </li>
            }
            <li>
              <Link className="headerButton shadowText" to="/departamente">Departamente</Link>
            </li>
            <li>
              <Link className="headerButton shadowText" to="/apps">Aplicații</Link>
            </li>
            <li>
              <a className="headerButton shadowText" href="https://thobor-blocks-page.netlify.app/" target="_blank" rel="noreferrer">Blocks</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Navbar;