import React from "react";

function Card({ image, text, an }) {
  return (
    <div className="cardd">
      <img className="imagine" alt="" src={image} />

      <div className="linie">
        <h1 className="an">{an}</h1>
      </div>
         <p className="text">
          {text}
        </p>
    </div>
  );
}

export default Card;
