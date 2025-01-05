import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function App( {image, name, adress}) {
  return (
    <div className="shadowText card">
      <a href={adress} target="0">
        <LazyLoadImage className="card-front-image card-image " src={image} />
      </a>
      <div className="card-faders">
        <LazyLoadImage className="card-fader card-image" src={image} />
        <LazyLoadImage className="card-fader card-image" src={image} />
        <LazyLoadImage className="card-fader card-image" src={image} />
        <LazyLoadImage className="card-fader card-image" src={image} />
      </div>
      <h3>{name}</h3>
    </div>
  );
}

export default App;
