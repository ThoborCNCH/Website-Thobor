import React from "react";
import { Link } from "react-router-dom";

function Post({ poza, titlu, link, data }) {
  return (
    <div className="post" data-aos={data}>
      <img src={poza} alt="" />
      <div className="text">
        <h2>{titlu}</h2>
      </div>
      <Link to={link} className="button">
        citeste mai multe
      </Link>
    </div>
  );
}

export default Post;
