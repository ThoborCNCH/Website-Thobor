import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import logo from "../../img/logo_thobor_celalalt.png";
import { useRef } from "react";
import useWindowSize from "./WindowSize";

function Navbar() {
  const { pathname } = useLocation();
  const nav = useRef(null);
  // const drop_ref = useRef(null);

  const drop = (e) => {
    console.log("e");
    //    drop_ref.current.siblings(".nav-dropdown").slideToggle();
    // $(".nav-dropdown").not(drop_ref.current.siblings()).hide();
    // e.stopPropagation();
  };

  const size = useWindowSize();

  // $("html").on("click", function () {
  //   $(".nav-dropdown").hide();
  // });
  const nav_click = () => {
    $("nav ul").slideToggle();
    nav.current.classList.toggle("active");
  };
  // Toggle open and close nav styles on click
  // $("#nav-toggle").on("click", function () {
  // });
  // $("#nav-toggle").on("click", function () {
  // });

  useEffect(() => {
    const ul = document.querySelector("nav ul");
    if (size.width >= 799) {
      // ul.style.display = "block";
      // nav.current.classList.remove("active");
    } else {
      if (ul.style.display != "block") {
        console.log("lasndlkdnasldnln")
        // ul.style.display = "none";
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
              <Link to="/despre">Alumni</Link>
            </li>
            <li>
              <Link to="/despre">Team</Link>
            </li>
            <li>
              <Link to="/sponsors">Sponsors</Link>
            </li>
            {/* <li>
              <a href="#!" onClick={drop} ref={drop_ref}>
                Services
              </a>
              <ul className="nav-dropdown">
                <li>
                  <a href="#!">Web Design</a>
                </li>
                <li>
                  <a href="#!">Web Development</a>
                </li>
                <li>
                  <a href="#!">Graphic Design</a>
                </li>
              </ul>
            </li> */}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Navbar;
