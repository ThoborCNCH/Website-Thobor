import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import logo from "../../img/logo_thobor_celalalt.png";
import { useRef } from "react";
import useWindowSize from "./WindowSize";
import { isMobile } from "react-device-detect";

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
        console.log("lasndlkdnasldnln");
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
  }, [pathname]);

  return (
    <section className="navigation">
      <div className="nav-container">
        <div className="brand">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <nav>
          <div className="nav-mobile">
            <a id="nav-toggle" href="#!" onClick={nav_click} ref={nav}>
              <span></span>
            </a>
          </div>
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/despre">Despre</Link>
            </li>
            <li>
              <Link to="/apps">Apps</Link>
            </li>
            <li>
              <Link to="/alumni">Alumni</Link>
            </li>
            <li>
              <Link to="/team">Team</Link>
            </li>
            <li>
              <Link to="/sponsors">Sponsors</Link>
            </li>
            {!isMobile && size.width > 700 && (
              <>
                <li>
                  <Link to="/simulator">Simulator</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Navbar;
