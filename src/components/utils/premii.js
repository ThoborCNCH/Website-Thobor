import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./styles/premii.scss";
import awardsData from "../../premiiData"; 

gsap.registerPlugin(CSSPlugin, ScrollTrigger, ScrollToPlugin);

const AwardsSection = () => {
  const [hoverStyles, setHoverStyles] = useState({});

  const handleMouseEnter = (e, index) => {
    setHoverStyles((prev) => ({
      ...prev,
      [index]: { transform: "scale(1.05)", transition: "transform 0.2s ease-in-out" },
    }));
  };

  const handleMouseMove = (e, index) => {
    const card = e.target;
    const img = card.querySelector("img");
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setHoverStyles((prev) => ({
      ...prev,
      [index]: {
        transform: `perspective(500px) rotateX(${50 - y}deg) rotateY(${x - 50}deg) scale(1.05)`,
      },
    }));
  };

  const handleMouseLeave = (e, index) => {
    setHoverStyles((prev) => ({
      ...prev,
      [index]: { transform: "scale(1)", transition: "transform 0.2s ease-in-out" },
    }));
  };

  const initializeAnimations = () => {
    gsap.set(".award-card", { opacity: 1, y: 0 });

    awardsData.forEach((award, i) => {
      const yearTrigger = document.querySelector(`#timeline-year-${award.year}`);
      const awardCard = document.querySelector(`.award-card-${i}`);



      if (awardCard) {
        gsap.set(awardCard, { opacity: 1, y: 0, rotation: 0 });

        gsap.fromTo(
          awardCard,
          { opacity: 0, y: 100, rotation: i % 2 === 0 ? -10 : 10 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: awardCard,
              scrub: true,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  };

  useEffect(() => {
    window.onload = () => {
      initializeAnimations();
    };

    return () => {
      window.onload = null; // Cleanup when the component unmounts
    };
  }, []);

  return (
    <div id="despre" style={{ flexDirection: "column", paddingTop: "20vh" }}>
      <div id="despreContent">
        <h2 className="shadowText despreTitlu" id="premiiText">Premii</h2>
      </div>
      <div className="timeline">
        <div id="awards-container">
          {awardsData.map((award, i) => (
            <React.Fragment key={i}>
              {(i === 0 || awardsData[i - 1].year !== award.year) && (
                <div
                  id={`timeline-year-${award.year}`}
                  className="timeline-year shadowText"
                  style={{ opacity: 1, visibility: 'visible' }} // Ensure visibility of year headers
                >
                  {award.year}
                </div>
              )}
              <div
                className={`award-card award-card-${i}`}
                onMouseEnter={(e) => handleMouseEnter(e, i)}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={(e) => handleMouseLeave(e, i)}
              >
                <img
                  src={award.image}
                  alt={award.alt}
                  style={hoverStyles[i] || {}}
                />
                <p>{award.description}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;
