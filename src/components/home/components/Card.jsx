import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Card({ image, text, an }) {
  return (
    <div className="cardd">
      <LazyLoadImage alt="" width={"100%"} height={270} src={image} />
      <div className="linie"> <h1 className="an">{an}</h1> </div>
      <p className="text">{text}</p>
    </div>
  );
}

export default Card;
