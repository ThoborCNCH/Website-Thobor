import React from "react";

function Card({ image, text, an, bafta, delete_premiu }) {
  return (
    <div className="cardd">
      <img className="imagine" alt="" src={image} />
      <div className="linie">
        {bafta ? (
          <button className="button" onClick={delete_premiu}>
            delete
          </button>
        ) : (
          <h1 className="an">{an}</h1>
        )}
      </div>
      <p className="text">{text}</p>
    </div>
  );
}

export default Card;
