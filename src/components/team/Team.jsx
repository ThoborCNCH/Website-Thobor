import React, { useEffect } from "react";
import Generatie from "../alumni/components/Generatie";
import Contact from "../utils/Contact";
import Up from "../utils/Up";
import AOS from "aos";
import "aos/dist/aos.css";

function Team() {
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

      <Generatie years="2018-2019" team={true} />
      <Generatie years="2019-2020" team={true} />
      <Generatie years="2020-2021" team={true} />
      <Generatie years="2021-2022" team={true} />
      <Contact />
      <Up />
    </div>
  );
}

export default Team;
