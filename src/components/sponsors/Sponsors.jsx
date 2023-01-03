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

firebase.initializeApp({
  apiKey: "AIzaSyC9bA5NKsStcYRPDDTJFQbFUI1oCX2tq4I",
  authDomain: "thobor-9436b.firebaseapp.com",
  projectId: "thobor-9436b",
  storageBucket: "thobor-9436b.appspot.com",
  messagingSenderId: "496274391107",
  appId: "1:496274391107:web:f1711686e690bab69fd4f6",
});
const firestore = firebase.firestore();

function Sponsors() {
  const sponRef = firestore.collection("sponsors");
  const query_spon = sponRef.orderBy("createAt", "desc");
  const [spon] = useCollectionData(query_spon, { idField: "id" });

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div style={{ background: "#2f2f2f" }}>
      <img
        src={require("../../img/sponsors_banner.svg").default}
        alt=""
        className="header"
      />{" "}
      <div className="sponsors">
        {spon && spon.map((sp) => <img src={sp.logo} />)}
      </div>
      <Contact />
      <Up />
    </div>
  );
}

export default Sponsors;
