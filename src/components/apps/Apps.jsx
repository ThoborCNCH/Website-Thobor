import React from "react";
import App from "./components/App";
import "./apps.scss";
import Up from "../utils/Up";
import Contact from "../utils/Contact";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Apps() {
    useEffect(() => {
        AOS.init();      
  },[])
  
    return (
    <>
      <img
        src={require("../../img/apps_banner.svg").default}
        className="header"
        alt=""
      />
      <div className="apps">
        <App
          data={["right", "left", "down", "up"]}
          titlu={"Aplicatia noastră - Realitate Augmentata -"}
          p={
            "Poti avea robotul Thor la tine acasa! Descarca aplicatia, printeaza codul QR si ai micul tau robot in buzunar. Robotica uneste lumea, iar noi, va prezentam robotul nostru din cel mai recent sezon FIRST Tech Challenge."
          }
          img={require("../../img/echipa.jpeg")}
          link="https://play.google.com/store/apps/details?id=ro.thobor.ar"
        />
        <App
          titlu={"Aplicatia noastră - Realitate Augmentata -"}
          p={
            "Poti avea robotul Thor la tine acasa! Descarca aplicatia, printeaza codul QR si ai micul tau robot in buzunar. Robotica uneste lumea, iar noi, va prezentam robotul nostru din cel mai recent sezon FIRST Tech Challenge."
          }
          img={require("../../img/echipa.jpeg")}
          link="https://play.google.com/store/apps/details?id=ro.thobor.ar"
          codeQR={require("../../img/qr.jpg")}
        />
        <App
          titlu={"Aplicatia noastră - Realitate Augmentata -"}
          p={
            "Poti avea robotul Thor la tine acasa! Descarca aplicatia, printeaza codul QR si ai micul tau robot in buzunar. Robotica uneste lumea, iar noi, va prezentam robotul nostru din cel mai recent sezon FIRST Tech Challenge."
          }
          img={require("../../img/echipa.jpeg")}
          link="https://play.google.com/store/apps/details?id=ro.thobor.ar"
        />
      </div>

      <Up />
      <Contact />
    </>
  );
}

export default Apps;
