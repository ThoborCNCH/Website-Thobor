import React, { useEffect } from "react";
import Generatie from "./components/Generatie";
import "./alumni.scss";
import Contact from "../utils/Contact";
import Up from "../utils/Up";
import AOS from "aos";
import "aos/dist/aos.css";

function Alumni() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div style={{ background: "#2f2f2f" }}>
      <img
        src={require("../../img/alumni_banner.svg").default}
        alt=""
        className="header"
      />

      <Generatie years="2018-2019" team={false} />
      <Generatie years="2019-2020" team={false} />
      <Generatie years="2020-2021" team={false} />
      <Generatie years="2021-2022" team={false} />

      <Contact />
      <Up />
    </div>
  );
}

export default Alumni;
