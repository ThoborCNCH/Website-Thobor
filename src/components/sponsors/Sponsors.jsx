import React, { useEffect } from "react";
import Contact from "../utils/Contact";
import Up from "../utils/Up";
import "./sponsors.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import Firestore from "../utils/Firestore";
import banner from "../../img/sponsors_banner.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const firestore = new Firestore();

function Sponsors() {

  const [spon, setSpon] = useState([]);
  const getSpon = async () => {
    await firestore.readDocuments("sponsors").then((res) => {
      setSpon(res);
    });
  };
  useEffect(() => {
    getSpon();
    AOS.init();
  }, []);
  return (
    <div style={{ background: "#2f2f2f" }}>
      <LazyLoadImage src={banner} className="header" />
      <div className="sponsors">
        {spon && spon.map((sp) => <img src={sp.logo} />)}
      </div>
      <Contact />
      <Up />
    </div>
  );
}

export default Sponsors;
