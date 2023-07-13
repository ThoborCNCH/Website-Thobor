import React from "react";
import { Link } from "react-router-dom";

import post_card_img from "../../../img/post_card_img.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Post({
  ajutor,
  poza,
  deleted,
  titlu,
  link,
  data,
  data2,
  dalay,
  text_scurt,
}) {
  return ajutor ? (
    <>
      <div className="post" style={{ height: "auto" }}>
        <div className="img">
          <LazyLoadImage src={poza} className="poza_main" width={"100%"}  height={"100%"} />
          <LazyLoadImage src={post_card_img} className="svg" width={"100%"}  height={"auto"}/>
        </div>
        <div className="text">
          <div className="title">
            <h2>{titlu}</h2>
            <div className="linie"></div>
          </div>
          <div className="para">
            <div className="linie_vert"></div>
            <p>{text_scurt}</p>
          </div>
          <button onClick={deleted} className="button" style={{ margin: 20 }}>
            delete
          </button>
          <Link to={link} preventScrollReset={true} className="link">
            <div className="coca"></div>
            <span>
              Citeste mai multe <i className="fas fa-caret-right"></i>
            </span>
          </Link>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="post" data-aos={data}>
        <div className="img">
          <LazyLoadImage src={poza} className="poza_main" />
          <LazyLoadImage src={post_card_img} className="svg" />
        </div>
        <div className="text">
          <div className="title">
            <h2 data-aos={data2} data-aos-delay={dalay}>
              {titlu}
            </h2>
            <div
              data-aos={data}
              data-aos-delay={dalay + 300}
              className="linie"
            ></div>
          </div>
          <div className="para" data-aos={data2} data-aos-delay={dalay}>
            <div
              className="linie_vert"
              data-aos={data2}
              data-aos-delay={dalay + 400}
            ></div>
            <p data-aos={data} data-aos-delay={dalay}>
              {text_scurt}
            </p>
          </div>
          <Link
            data-aos={data2}
            to={link}
            preventScrollReset={true}
            className="link"
          >
            <div className="coca"></div>
            <span>
              Citeste mai multe <i className="fas fa-caret-right"></i>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Post;
