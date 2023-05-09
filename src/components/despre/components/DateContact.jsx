import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import Map from "./Map";

function DateContact() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="datecontact">
      <div className="left">
        <div className="title">
          <h1 data-aos="fade-down">
            Suntem de la <span>Colegiul Național "Calistrat Hogaș"</span>
          </h1>
          <div className="linie" data-aos="fade-right"></div>
        </div>
        <ul>
          <li data-aos="fade-right">
            Strada Costache Racoviţă, nr.20, Tecuci, 805300
          </li>
          <li data-aos="fade-right">
            <a href="tel: 0236/820010">0236/820010</a>
          </li>
          <li data-aos="fade-right">
            <a href="mailto:lchogas@yahoo.com">lchogas@yahoo.com</a>
          </li>
        </ul>
      </div>
      <div className="right">
        <Map />
      </div>
    </div>
  );
}

export default DateContact;
