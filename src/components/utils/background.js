import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/background.scss';

gsap.registerPlugin(ScrollTrigger);

const Background = () => {
  const backgroundRef = useRef(null);
  const spansRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the background div with ScrollTrigger
      gsap.to(backgroundRef.current, {
        backgroundImage: "radial-gradient(#313131, #000000)",
        color: "#f1f1f1",
        scrollTrigger: {
          markers: false, 
          trigger: "#despre",
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });

      // Animate spans with individual ScrollTriggers
      spansRef.current.forEach((span, index) => {
        const duration = 2 + Math.random() * 2;
        const randomStartY = `${Math.floor(Math.random() * 100 + 50)}vh`;

        gsap.fromTo(
          span,
          {
            y: randomStartY,
            scale: 1,
            rotation: 0,
          },
          {
            y: "-200vh",
            scale: 1.2,
            rotation: 360,
            duration: duration,
            ease: "none",
            scrollTrigger: {
              trigger: span,
              scrub: true,
              start: "top bottom",
              end: "bottom top",
            },
          }
        );
      });
    }, [backgroundRef.current, spansRef.current]);

    // Cleanup GSAP animations when the component is unmounted
    return () => {
      ctx.revert();
      // Additionally clean up any manually created ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="background" ref={backgroundRef}>
      {[...Array(32)].map((_, i) => (
        <span key={i} ref={(el) => (spansRef.current[i] = el)}></span>
      ))}
    </div>
  );
};

export default Background;

