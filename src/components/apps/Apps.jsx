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

const firestore = new Firestore();

function Apps() {
  const [apps, setApps] = useState([]);
  const getApps = async () => {
    await firestore.sortdata("apps", "createAt", "desc").then((res) => {
      setApps(res);
    });
  };

  useEffect(() => {
    AOS.init();
    getApps();
  }, []);

  return (
    <>
      <img
        src={require("../../img/apps_banner.svg").default}
        className="header"
        alt=""
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
        {/*         
        <App
          titlu={"Aplicatia noastră - Realitate Augmentata -"}
          txt_link="Download"
          p={
            "Poti avea robotul Thor la tine acasa! Descarca aplicatia, printeaza codul QR si ai micul tau robot in buzunar. Robotica uneste lumea, iar noi, va prezentam robotul nostru din cel mai recent sezon FIRST Tech Challenge."
          }
          img={require("../../img/echipa.jpeg")}
          link="https://play.google.com/store/apps/details?id=ro.thobor.ar"
        />
        <App
          titlu={"Aplicatia noastră - Realitate Augmentata -"}
          txt_link="Download"
          p={
            "Poti avea robotul Thor la tine acasa! Descarca aplicatia, printeaza codul QR si ai micul tau robot in buzunar. Robotica uneste lumea, iar noi, va prezentam robotul nostru din cel mai recent sezon FIRST Tech Challenge."
          }
          img={require("../../img/echipa.jpeg")}
          link="https://play.google.com/store/apps/details?id=ro.thobor.ar"
          codeQR={require("../../img/qr.jpg")}
        />
        <App
          titlu={"Aplicatia noastră - Realitate Augmentata -"}
          txt_link="Download"
          p={
            "Poti avea robotul Thor la tine acasa! Descarca aplicatia, printeaza codul QR si ai micul tau robot in buzunar. Robotica uneste lumea, iar noi, va prezentam robotul nostru din cel mai recent sezon FIRST Tech Challenge."
          }
          img={require("../../img/echipa.jpeg")}
          link="https://play.google.com/store/apps/details?id=ro.thobor.ar"
        /> */}
      </div>

      <Up />
      <Contact />
    </>
  );
}

export default Apps;
