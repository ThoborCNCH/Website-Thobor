import "./apps.scss";
import React from "react";
import App from "./components/App";
import TextIntro from "../utils/Text";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

import app1 from "../../images/apps1.png";
import app2 from "../../images/apps2.png";
import app3 from "../../images/apps3.png";

const pageVariants = {
  initial: { opacity: 0,  },
  animate: {opacity: 1 },
  exit: { opacity: 0 },
};

function Apps({ apps }) {
  return (
    <>
      <TextIntro textContent="Aplicații" customStyle={{ marginBottom: '-20vh' }}/>
    <div className="overlay-container">
                {/* Example: Individual elements */}
                <LazyLoadImage 
                    src={app1} 
                    className="element app1" 
                />
                <LazyLoadImage 
                    src={app2} 
                    alt="Star 1" 
                    className="element app2" 
                />
                <LazyLoadImage 
                    src={app3}  
                    alt="Star 2" 
                    className="element app3" 
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
