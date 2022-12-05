import React, { useState } from "react";

function Stem() {
  const [clasa, setClasa] = useState("fas fa-caret-right");
  const [color, setColor] = useState("white");
  const [h, setH] = useState("0");

  function more() {
    if (clasa === "fas fa-caret-up") {
      setClasa("fas fa-caret-right");
      setColor("white");
      setH("0");
    } else {
      setClasa("fas fa-caret-up");
      setColor("#26b33e");
      setH("auto");
    }
  }

  return (
    <>
      <div className="stem" data-aos="fade-down">
        <img
          src={require("../../../img/stem.png")}
          alt=""
          data-aos="fade-right"
        />
        <div className="stemText" data-aos="fade-left">
          <h3>Despre modelul STEM</h3>
          <h6>
            <span id="STEM">Educația STEM </span>
            este un acronim care vine de la cuvintele englezeşti Science,
            Technology, Engineering şi Mathematics, care se traduc prin Ştiinţă,
            Tehnologie, Inginerie şi Matematică. Astfel, STEM include un
            curriculum bazat pe ideea de educare a elevilor cu ajutorul a patru
            discipline diferite.
          </h6>
          <div className="more">
            <div className="press" onClick={more}>
              <i className={clasa} style={{ color: color }}></i>
              <span id="STEM" style={{ color: color }}>
                Mai multe despre concept
              </span>
            </div>
            <div
              className="hide"
              style={{ height: h, transition: "0.5s ease-in-out" }}
            >
              <h6>
                Acest concept a apărut că urmare a faptului că în ultimii ani
                s-a observat la nivel mondial, deci și în țara noastră, o
                scădere îngrijorătoare a interesului elevilor pentru domeniul
                științei. Astfel, au fost concepute programe care încurajează
                elevii să descopere lumea fascinantă a științelor exacte.
              </h6>
              <h6>
                <span id="STEM">Robotica </span>
                îmbină eficient aceste discipline, conducând elevii pas cu pas,
                prin descoperire, către obiectul final, robotul, punând în
                practică un alt concept –
                <span id="STEM"> Learning by doing!</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stem;
