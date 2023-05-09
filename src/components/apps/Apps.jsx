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
      </div>

      <Up />
      <Contact />
    </>
  );
}

export default Apps;
