import teamPhoto from '../../images/teamPhoto.png';
import './styles/aboutSection.scss';

import React, { useEffect, useRef } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import greenLight from '../../images/greenLight.png';
import star1 from '../../images/star1.png';
import star2 from '../../images/star2.png';
import star3 from '../../images/star3.png';
import star4 from '../../images/star4.png';
import star5 from '../../images/star5.png';
import handRobot from '../../images/handRobot.png';
import arrowTitle from '../../images/arrowTitle.png';
import titleChoice from '../../images/titleChoice.png';
import robotAbout from "../../videos/despreNoi.webm";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(CSSPlugin, ScrollTrigger, ScrollToPlugin, useGSAP);


const AboutSection = () => {
    useGSAP(
        () => {
                gsap.utils.toArray(".element").forEach((element) => {
                    gsap.from(element, {
                        y: 100, 
                        opacity: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 90%",
                            scrub: true,
                        },
                    });
                });
        
                gsap.utils.toArray(".despreTitlu").forEach((title) => {
                    gsap.from(title, {
                        x: -100,
                        rotate: 15,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: title,
                            start: "top 90%",
                            scrub: true,
                        },
                    });
                });
        
                gsap.utils.toArray(".despreBox").forEach((box) => {
                    gsap.from(box, {
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: box,
                            start: "top 90%",
                            scrub: true,
                        },
                    });
                });
        
                gsap.from(".canvas-istorie", {
                    scale: 0.8,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".canvas-istorie",
                        start: "top 80%",
                        scrub: true,
                    },
                });
        }
    );
    return (
        <div>
            <div className="overlay-container">
                {/* Example: Individual elements */}
                <LazyLoadImage 
                    src={greenLight} 
                    className="element greenLight" 
                />
                <LazyLoadImage 
                    src={star1} 
                    alt="Star 1" 
                    className="element star1" 
                />
                <LazyLoadImage 
                    src={star2}  
                    alt="Star 2" 
                    className="element star2" 
                />
                <LazyLoadImage 
                    src={star3} 
                    alt="Shape 1" 
                    className="element star3" 
                />
                <LazyLoadImage 
                    src={star4} 
                    alt="Shape 1" 
                    className="element star4" 
                />
                <LazyLoadImage 
                    src={handRobot} 
                    alt="Shape 1" 
                    className="element handRobot" 
                />
                <LazyLoadImage 
                    src={star5} 
                    alt="Shape 1" 
                    className="element star5" 
                />
                <LazyLoadImage 
                    src={arrowTitle} 
                    alt="Shape 1" 
                    className="element arrowTitle" 
                />
                {/* Add more elements as needed */}
            </div>
            {/* About Us Section */}
            <section id="despre" style={{ flexDirection: 'column' }}>
                <div id="despreContent">
                    <h1 className="shadowText despreTitlu" style={{ textAlign: 'center', marginRight: '0' }}>
                        Despre noi
                    </h1>
                    <div className="despreBox" style={{ marginBottom: '4vh' }}>
                        <p id="despreText">
                            Echipa THOBOR a Colegiului Național “Calistrat Hogaş” Tecuci, este formată din șaisprezece liceeni si doi mentori care au îndrăznit să viseze.
                        </p>
                    </div>
                </div>
                <img src={teamPhoto} alt="Poza de echipa" className="despreImage" />
                
            </section>

            {/* Team History Section */}
            <section id="despre" style={{ flexDirection: 'row' }}>
                <div id="despreContent">
                    <h1 className="shadowText despreTitlu" style={{ textAlign: 'center', marginRight: '0' }}>
                        Istoria echipei
                    </h1>
                    <div className="despreBox" style={{ marginBottom: '4vh' }}>
                        <p id="despreText">
                            Plecată dintr-o zonă fără tradiții în domeniu, echipa și-a propus să aducă în comunitate o idee nouă, care să-i inspire pe toți colegii, care să deschidă noi direcții de evoluție pentru copii. Echipa are deja o vechime de 7 ani și pe parcursul acestor ani am învățat că First este ca o călătorie, o călătorie pe care ai putea să o oprești în orice moment dar care te motivează continuu să mergi mai departe, să încerci mai mult și să te dedici și mai mult.
                        </p>
                    </div>
                </div>
                 <video className = "video-responsiveIntro" width="536" weight = "519" loop autoPlay muted disablepictureinpicture controlslist="nodownload noplaybackrate nofullscreen">
                              <source src={robotAbout} type="video/webm" />
                              Your browser does not support the video tag.
                </video>
                {/*<canvas ref={canvasRef} id="canvasIstorie" data-engine="three.js r149"></canvas>*/}

    
            </section>

                   

            {/* Why THOBOR Section */}
            <section 
            id="despre" 
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                textAlign: 'center',
            }}>
                <div id="despreContent">
                    <h1 className="shadowText despreTitlu" style={{ textAlign: 'center', marginRight: '0' }}>
                        De ce <br /> THOBOR?
                    </h1>
                    <div className="despreBox" style={{ marginBottom: '4vh' }}>
                        <p id="despreText">
                            Numele echipei THOBOR a fost propus de unul din mentorii echipei în momentul înființării echipei, iar semnificația acestuia vine de la cuvântul "robot" scris invers, iar H-ul din THOBOR vine de la Hogaș, deoarece locația de unde a inceput totul a fost Colegiul Național Calistrat Hogaș din Tecuci!
                        </p>
                    </div>
                </div>
                <LazyLoadImage 
                    src={titleChoice} 
                    alt="Shape 1" 
                    className="titleChoice" 
                    style={{pointerEvents:'none'}}
                />
            </section>
        </div>
    );
};

export default AboutSection;
