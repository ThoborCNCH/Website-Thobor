import './styles/aboutSection.scss';
import React from 'react';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

import OuttakeVideo from '../../images/outtake.png';
import IntakeVideo from '../../gifs/intake.gif';
import SasiuVideo from '../../images/Sasiu.png';


gsap.registerPlugin(CSSPlugin, ScrollTrigger, ScrollToPlugin, useGSAP);

const AboutRobot = () => {
    return (
    <>
         {/* Sasiu Section */}
         <section id="despre" style={{ flexDirection: 'column' }}>
                <div id="despreContent">
                    <h1 className="shadowText despreTitlu" style={{ textAlign: 'center', marginRight: '0' }}>
                        Șasiu
                    </h1>
                    <div className="despreBox" style={{ marginBottom: '4vh' }}>
                        <p id="despreText">
                        Robotul utilizează un custom drive train cu motoare de 312RPM și curele de 365mm (73 dinți). Distribuția greutății a fost echilibrată prin adăugarea de 2.2 kg pe fiecare parte, iar unghiul glisierelor a fost ajustat la peste 65°. Codul rulează pe SDK 10.1.1 FIRST, cu librării precum FTCLib, PedroPathing și FtcDashboard pentru eficiență și control avansat.
                        </p>
                    </div>
                </div>
                <img className = "video-responsiveIntro" src={SasiuVideo} alt=""/>
            </section>
            {/* Intake Section */}
            <section id="despre" style={{ flexDirection: 'row' }}>
                <div id="despreContent">
                    <h1 className="shadowText despreTitlu" style={{ textAlign: 'center', marginRight: '0' }}>
                        Intake
                    </h1>
                    <div className="despreBox" style={{ marginBottom: '4vh' }}>
                        <p id="despreText">
                        Intake-ul are brațe mobile și glisiere SAR230, cu motor de 435RPM pentru colectare. Sistemul previne blocajele prin servo-uri cu rotație continuă, iar extensia brațelor permite accesul la sample-uri greu accesibile.
                        </p>
                    </div>
                </div>
                <img className = "video-responsiveIntro" src={IntakeVideo} alt=""/>
            </section>
            {/* Outtake Section */}
            <section id="despre" style={{ flexDirection: 'row' }}>
                <div id="despreContent">
                    <h1 className="shadowText despreTitlu" style={{ textAlign: 'center', marginRight: '0' }}>
                        Outtake
                    </h1>
                    <div className="despreBox" style={{ marginBottom: '4vh' }}>
                        <p id="despreText">
                        Outtake-ul include servo-uri pentru rotația completă la 180° și controlul brațelor și ghearei. Brațul mic ajustează unghiul pentru plasarea precisă a sample-urilor.
                        </p>
                    </div>
                </div>
                <img className = "video-responsiveIntro" src={OuttakeVideo} alt=""/>
            </section>
                 
    </>
    );
}

export default AboutRobot;
