import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import Contact from "../utils/Contact";
import Up from "../utils/Up";
import "./apps.scss";
import App from "./components/App";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import Firestore from "../utils/Firestore";

import banner from "../../img/apps_banner.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Svg from "../utils/Svg";

function Apps({ apps }) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <LazyLoadImage
        src={banner}
        width={"100vw"}
        height={"auto"}
        className="header"
      />
      <div className="apps">
        {apps &&
          apps.map((app) => (
            <App
              titlu={app.titlu}
              codeQR={app.cod_qr}
              img={app.img}
              link={app.link}
              p={app.descriere}
              txt_link={app.link_text}
            />
          ))}
      </div>
      <Svg />
      <Contact />
      <Up />
    </>
  );
}

export default Apps;
