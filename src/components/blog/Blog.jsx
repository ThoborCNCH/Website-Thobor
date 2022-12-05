import React, { useEffect } from "react";
import "./blog.scss";
import Post from "./components/Post";
import AOS from "aos";
import "aos/dist/aos.css";
import Contact from "../utils/Contact";
import Up from "../utils/Up";

function Blog() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <img
        className="header"
        src={require("../../img/blog_banner.svg").default}
        alt=""
      />

      <div className="blog">
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />{" "}
        <Post
          data="fade-right"
          link={"/blog/1"}
          poza={require("../../img/robo_px.jpg")}
          titlu={
            "Titlul postarii dar nush ce sa pun acum, asa ca pun ceva mai lung"
          }
        />
      </div>
      <Contact />
      <Up />
    </>
  );
}

export default Blog;
