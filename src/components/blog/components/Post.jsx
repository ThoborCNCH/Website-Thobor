import React from "react";
import { Link } from "react-router-dom";

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
      {" "}
      <div className="post" style={{height:"auto"}}>
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
            <p>{text_scurt}</p>
          </div>
          <button onClick={deleted} className="button" style={{margin:20}}>delete</button>
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
          <img src={poza} alt="" className="poza_main" />
          <img
            src={require("../../../img/post_card_img.svg").default}
            className="svg"
            alt=""
          />
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
