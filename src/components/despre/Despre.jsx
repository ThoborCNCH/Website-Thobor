import React, { useEffect } from "react";
import "./despre.scss";
import AOS from "aos";
import "aos/dist/aos.css";

function Despre() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div style={{ background: "white" }}>
        <img
          src={require("../../img/despre_banner.svg").default}
          alt=""
          className="header"
        />
      </div>

      <div className="part">
        <div className="text">
          <div className="title">
            <h1 data-aos="fade-right" data-aos-delay="600">
              Despre Thobor
            </h1>
            <div
              data-aos="fade-right"
              data-aos-delay="900"
              className="linie"
            ></div>
          </div>
          <p data-aos-delay="700" data-aos="fade-down">
            Echipa THOBOR a Colegiului Național “Calistrat Hogaş” Tecuci, este
            formată din șaisprezece liceeni si doi mentori care au îndrăznit să
            viseze. Plecată dintr-o zonă fără tradiții în domeniu, echipa și-a
            propus să aducă în comunitate o idee nouă, care să-i inspire pe toți
            colegii, care să deschidă noi direcții de evoluție pentru copii.
            Echipa are deja o vechime de {new Date().getFullYear() - 2017} ani
            și pe parcursul acestor ani am învățat că First este ca o călătorie,
            o călătorie pe care ai putea să o oprești în orice moment dar care
            te motivează continuu să mergi mai departe, să încerci mai mult și
            să te dedici și mai mult.
          </p>
        </div>
        <div
          data-aos="fade-up"
          // src={require("../../img/team_fain.png")}
          data-aos-delay="600"
          // alt=""
          className="img"
        />
      </div>
      <div className="part">
        <div className="text">
          <div className="title">
            <h1 data-aos="fade-right">Despre Thobor</h1>
            <div
              data-aos="fade-right"
              data-aos-delay="200"
              className="linie"
            ></div>
          </div>
          <p data-aos="fade-down">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            necessitatibus corporis hic totam consequuntur cumque laboriosam,
            ipsam sunt, ea cum est tempora eaque officiis consequatur
            temporibus, non sequi rerum accusantium! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Repellat delectus, at maxime debitis,
            eaque sunt, consequatur labore repudiandae libero ipsa iure! Harum
            quidem magnam dolor adipisci molestias? Fugit, voluptates quae?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima in
            incidunt officia distinctio quasi natus minus maiores voluptatum
            reiciendis? Harum. Repellat delectus, at maxime debitis, eaque sunt,
            consequatur labore repudiandae libero ipsa iure! Harum quidem magnam
            dolor adipisci molestias? Fugit, voluptates quae? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Minima in incidunt officia
            distinctio quasi natus minus maiores voluptatum reiciendis? Harum.
          </p>
        </div>
        <img
          data-aos="fade-up"
          src={require("../../img/echipa.jpeg")}
          alt=""
          className="img2"
        />
      </div>
    </>
  );
}

export default Despre;
