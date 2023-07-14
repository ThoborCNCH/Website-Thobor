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
import Svg from "../utils/Svg";

const firestore = new Firestore();

function Sponsors({ spon }) {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div style={{ background: "#2f2f2f" }}>
      <LazyLoadImage
        src={banner}
        width={"100vw"}
        height={"auto"}
        className="header"
      />
      <div className="sponsors">
        {spon &&
          spon.map((sp) => (
            <>
            <LazyLoadImage
              key={sp.logo}
              src={sp.logo}
              width={300}
              height={"auto"}
            />
            </>

          ))}
      </div>
      <Svg />
      <Contact />
      <Up />
    </div>
  );
}

export default Sponsors;
