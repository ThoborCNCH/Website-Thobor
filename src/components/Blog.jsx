import React from "react";
import "../style/blog.scss";
import $ from "jquery";

$("nav ul li > a:not(:only-child)").on("click", function (e) {
  $(this).siblings(".nav-dropdown").slideToggle();
  $(".nav-dropdown").not($(this).siblings()).hide();
  e.stopPropagation();
});
$("html").on("click", function () {
  $(".nav-dropdown").hide();
});
// Toggle open and close nav styles on click
$("#nav-toggle").on("click", function () {
  $("nav ul").slideToggle();
});
$("#nav-toggle").on("click", function () {
  this.classList.toggle("active");
});

function Blog() {
  return (
    <>
      <section className="navigation">
        <div className="nav-container">
          <div className="brand">
            <a href="#!"> THOBOR </a>
          </div>
          <nav>
            <div className="nav-mobile">
              <a id="nav-toggle" href="#!">
                <span></span>
              </a>
            </div>
            <ul className="nav-list">
              <li>
                <a href="#!">Home</a>
              </li>
              <li>
                <a href="#!">Shop</a>
              </li>
              <li>
                <a href="#!">Services</a>
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
              </li>
              <li>
                <a href="#!">About Us</a>
              </li>
              <li>
                <a href="#!">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <img
        className="header"
        src={require("../img/blog_banner.svg").default}
        alt=""
      />
    </>
  );
}

export default Blog;
