import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import Up from "../utils/Up";
import BuyUsACoffee from "../utils/BuyUsACoffee.jsx";
import Stem from "./components/Stem";
import "./despre.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";

import team from "../../img/about_team.jpg"
import robot from "../../img/robot.png"
import departamente from "../../img/departamente.png"
import thoborBot from "../../img/logo_thobor_celalalt.png"

function Despre() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <main>
        <div className="card-about" id="top-left">
          <LazyLoadImage src={ team } alt="Image" />
          <div className="text-content">
            <h1>Istoria THOBOR</h1>
            <p>Echipa THOBOR a Colegiului Național “Calistrat Hogaş” Tecuci, este formată din șaisprezece liceeni si doi mentori care au îndrăznit să viseze. Plecată dintr-o zonă fără tradiții în domeniu, echipa și-a propus să aducă în comunitate o idee nouă, care să-i inspire pe toți colegii, care să deschidă noi direcții de evoluție pentru copii. Echipa are deja o vechime de 7 ani și pe parcursul acestor ani am învățat că First este ca o călătorie, o călătorie pe care ai putea să o oprești în orice moment dar care te motivează continuu să mergi mai departe, să încerci mai mult și să te dedici și mai mult.</p>
          </div>
        </div>
        <div className="card-about" id="top-right">

          <LazyLoadImage src={ robot } alt="Image" />
          <div className="text-content">
            <h1>Robotul nostru</h1>
            <p>Robotul nostru de anul acesta este Apolo, (a.k.a. Schnappi), un robot in care s-au pus peste 500 de ore de munca de catre departameltele tehnice (Mecanica, Programarea & Proiectarea 3D). Acesta are 2 sisteme principale, unul de intake & unul de out-take. Ambele sisteme au la baza 2 perechi de gheare optimizate pentru apucarea pixelilor din sezonul CenterStage. Modul cum acesta scoreaza pixelii este urmatorul: Cele 2 gheare de pe sistemul de intake sunt coborate de catre un virtualbar pana cand ajung la distanta de 2-3 mm de sol. Acestea apuca pixelii, si ii ridica pe un suport de pixeli, din care sunt luati de catre sistemul de out-take, ce se ridica folosind un sistem de glisiere & sfori de tipul waterfall ca sa puna pixelii pe backdrop.</p>
          </div>
        </div>
        <div className="card-about" id="bottom-left">
          <LazyLoadImage src={ departamente } alt="Image" />
          <div className="text-content">
            <h1>Departamentele Noaste</h1>
            <p>Echipa THOBOR este impartita in 5 deparamente ce colaboreaza intr-un mod armonic pentru a avea un workflow cat mai eficient. Aceste deparamente sunt: Mecanica, ce se ocupa cu asamblarea fizica a robotului. Proiectarea 3D, a carei ocupatie este creaera pieselor printate 3D pentru robot. Programarea, ce se ocupa cu aducerea la viata a robotului in perioadele de autonom & tele-op din meciuri, dar si cu management-ul aplicatiilor si a site-ului nostru. Marketingul, a carei procupari sunt aducerea sponsorilor, managerierea evenimentelor la care participam & raspandirea influentei THOBOR prin modelul STEM. Iar in cele din urma, departamentul de Jurnal are la baza compunerea caietului tehnic ce va fi prezentat in etapele regionale & nationale.</p>
          </div>

        </div>
        <div className="card-about" id="bottom-right">
          <LazyLoadImage src={ thoborBot } alt="Image" />
          <div className="text-content">
            <h1>De ce THOBOR?</h1>
            <p>Numele echipei THOBOR a fost propus de unul din mentorii echipei in momentul infiintarii echipei, iar semnificatia acestuia vine de la cuvantul "robot" scris invers, iar H-ul din THOBOR vine de la Hogas, deoarece locatia de unde a inceput totul a fost Colegiul National Calistrat Hogas din Tecuci</p>
          </div>

        </div>
      </main>
      <Stem />
      <Up />
      <BuyUsACoffee />
    </>
  );
}

export default Despre;
