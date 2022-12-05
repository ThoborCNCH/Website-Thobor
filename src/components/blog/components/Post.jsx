import React from "react";
import { Link } from "react-router-dom";

function Post({ poza, titlu, link, data }) {
  return (
    <div className="post" data-aos={data}>
      <div className="img">
        <img src={poza} alt="" className="poza_main" />
        <img
          src={require("../../../img/post_card_img.svg").default}
          className="svg"
          alt=""
        />
      </div>
      <div className="text">
        <div className="title">
          <h2>{titlu}</h2>
          <div className="linie"></div>
        </div>
        <div className="para">
          <div className="linie_vert"></div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quod
            laborum soluta, iure in veritatis dolores dolore laboriosam atque
            veniam nihil itaque, mollitia quaerat illo obcaecati ipsum explicabo
            ratione labore.
          </p>
        </div>
        <Link to={link} preventScrollReset={true} className="link">
          <div className="coca"></div>
          <span> citeste mai multe <i className="fas fa-caret-right"></i></span>
        </Link>
      </div>
    </div>
  );
}

export default Post;
