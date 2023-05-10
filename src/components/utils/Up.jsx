import React from "react";
import up from "../../img/up.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Up() {
  const scrool= () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }
  return (
    <div onClick={scrool} className="up" data-aos="fade-up">
      <LazyLoadImage src={up} alt="" width={50} height={50} />
    </div>
  );
}

export default Up;
