import "./apps.scss";
import React from "react";
import App from "./components/App";
import TextIntro from "../utils/Text";
import { LazyLoadImage } from "react-lazy-load-image-component";

import app1 from "../../images/apps1.png";
import app2 from "../../images/apps2.png";
import app3 from "../../images/apps3.png";

function Apps({ apps }) {
  return (
    <>
      <TextIntro textContent="JOCURI" customStyle={{ marginBottom: '-20vh' }}/>
    <div className="overlay-container">
                {/* Example: Individual elements */}
                <LazyLoadImage 
                    src={app1} 
                    className="element app1" 
                />
              
                
      </div>
      <div className="apps">
        {apps && apps.map((app) => (
          <App name={app.name} image={app.image} adress={app.adress}/>
        ))}
      </div>
    </>
  );
}

export default Apps;
