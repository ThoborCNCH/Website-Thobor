import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import over from "../../../img/over_alumni_img.svg";
import abs from "../../../img/absolute_alumni.svg";
function Persoana({ no, nume, faculta, text, img, id, delete_this }) {
  return no ? (
    <div className="alumn">
      <div className="top">
        <div className="imgs">
          <LazyLoadImage src={img} width={"100%"} height={"auto"} alt="" />
          <LazyLoadImage
            src={over}
            width={"100%"}
            height={"auto"}
            className="svg"
          />
        </div>

        <div className="ttext">
          <h1>{nume}</h1>
          <h3>{faculta}</h3>
        </div>
      </div>
      <div className="text">
        <p
          style={{ textAlign: "left" }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      <button
        className="button"
        onClick={() => {
          delete_this(id);
        }}
      >
        delete this one
      </button>
      <LazyLoadImage
        src={abs}
        width={"auto"}
        height={"auto"}
        className="abs first"
      />
      <LazyLoadImage
        src={abs}
        width={"auto"}
        height={"auto"}
        className="abs second"
      />
    </div>
  ) : (
    <div className="alumn" data-aos="fade-left">
      <div className="top">
        <div className="imgs">
          <LazyLoadImage src={img} width={"100%"} height={"auto"} alt="" />
          <LazyLoadImage
            src={over}
            width={"100%"}
            height={"auto"}
            className="svg"
          />
        </div>

        <div className="ttext">
          <h1>{nume}</h1>
          <h3>{faculta}</h3>
        </div>
      </div>
      <div className="text">
        <p
          style={{ textAlign: "left" }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      <LazyLoadImage
        src={abs}
        className="abs first"
        width={"auto"}
        height={"auto"}
      />
      <LazyLoadImage
        src={abs}
        className="abs second"
        width={"auto"}
        height={"auto"}
      />
    </div>
  );
}

export default Persoana;
