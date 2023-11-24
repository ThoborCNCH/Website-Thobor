import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import logo from "../../img/logo_thobor_celalalt.png";
import { useRef } from "react";
import useWindowSize from "./WindowSize";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
      <div className="nav-container">
        <div className="brand">
          <Link to="/">
            <LazyLoadImage
              src={logo}
              width="180px"
              height="50px"
              style={{ width: 180, height: 50 }}
              alt="logo"
            />
          </Link>
        </div>
        <nav>
          <div className="nav-mobile">
            <button type="button" id="nav-toggle" href="#!" onClick={nav_click} ref={nav}>
              <span />
            </button>
          </div>
          <ul className="nav-list">
            <li>
              <Link to="/">Acasa</Link>
            </li>
            {
              d.getMonth() === 9 &&
                <li>
                  <Link to="/recrutari">Recrutari</Link>
                </li>
            }
            <li>
              <Link to="/despre">Despre</Link>
            </li>
            <li>
              <Link to="/apps">Aplicatii</Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Navbar;
