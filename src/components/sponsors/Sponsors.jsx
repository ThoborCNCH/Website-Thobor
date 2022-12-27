import React, { useEffect } from "react";
import Contact from "../utils/Contact";
import Up from "../utils/Up";
import "./sponsors.scss";
import AOS from "aos";
import "aos/dist/aos.css";

function Sponsors() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div style={{ background: "#2f2f2f" }}>
      <img
        src={require("../../img/sponsors_banner.svg").default}
        alt=""
        className="header"
      />
      <div className="sponsors">
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
        <img src="https://www.marcoser.ro/images/logo2.png" alt="" />
      </div>
      <Contact />
      <Up />
    </div>
  );
}

export default Sponsors;
