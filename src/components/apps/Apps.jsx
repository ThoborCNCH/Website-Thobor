import React from "react";
import App from "./components/App";
import "./apps.scss";
import Up from "../utils/Up";
import Contact from "../utils/Contact";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyC9bA5NKsStcYRPDDTJFQbFUI1oCX2tq4I",
  authDomain: "thobor-9436b.firebaseapp.com",
  projectId: "thobor-9436b",
  storageBucket: "thobor-9436b.appspot.com",
  messagingSenderId: "496274391107",
  appId: "1:496274391107:web:f1711686e690bab69fd4f6",
});

const firestore = firebase.firestore();

function Apps() {
  useEffect(() => {
    AOS.init();
  }, []);
  const appsRef = firestore.collection("apps");

  const query_app = appsRef.orderBy("createAt", "desc");

  const [apps] = useCollectionData(query_app, { idField: "id" });

  useEffect(() => {
    apps && console.log(apps[0]);
  }, [apps]);

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
