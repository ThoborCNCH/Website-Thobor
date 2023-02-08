import React from "react";
import { useEffect } from "react";

function Persoana({ no, nume, faculta, text, img, id, delete_this }) {
  useEffect(() => {
    console.log(text);
  }, []);
  return no ? (
    <div className="alumn">
      <div className="top">
        <div className="imgs">
          <img src={img} alt="" />
          <img
            className="svg"
            src={require("../../../img/over_alumni_img.svg").default}
            alt=""
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
      <button className="button" onClick={() => delete_this(id)}>
        delete this one
      </button>
      <img
        src={require("../../../img/absolute_alumni.svg").default}
        alt=""
        className="abs first"
      />
      <img
        src={require("../../../img/absolute_alumni.svg").default}
        alt=""
        className="abs second"
      />
    </div>
  ) : (
    <div className="alumn" data-aos="fade-left">
      <div className="top">
        <div className="imgs">
          <img src={img} alt="" />
          <img
            className="svg"
            src={require("../../../img/over_alumni_img.svg").default}
            alt=""
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
      <img
        src={require("../../../img/absolute_alumni.svg").default}
        alt=""
        className="abs first"
      />
      <img
        src={require("../../../img/absolute_alumni.svg").default}
        alt=""
        className="abs second"
      />
    </div>
  );
}

export default Persoana;
