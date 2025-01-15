import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { Link } from 'react-router-dom';
import './styles/navbar.scss';
import logo from '../../images/logo.png';

gsap.registerPlugin(CSSPlugin);

const Navbar = () => {
  const headerRef = useRef(null);
  const headerTextsRef = useRef(null);
  const headerButtonsRef = useRef([]);
  const headerLogoRef = useRef(null);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    const onPageLoad = () => {
      const ctx = gsap.context(() => {
        const animationDelay = 0.5;

        // Header animation
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 1, delay: animationDelay, ease: 'power3.out' }
        );

        // Header texts animation
        gsap.from(headerTextsRef.current, {
          opacity: 0,
          y: -20,
          duration: 1,
          delay: animationDelay + 0.2,
          ease: 'power3.out',
        });

        // Logo animation
        gsap.from(headerLogoRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          delay: animationDelay + 0.4,
          ease: 'power3.out',
        });

        // Header buttons animation with staggered effect
        gsap.from(headerButtonsRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          stagger: 0.15,
          delay: animationDelay + 0.6,
          ease: 'power3.out',
        });
      });

      return () => {
        ctx.revert();
      };
    };

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      return () => window.removeEventListener('load', onPageLoad);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header id="header" ref={headerRef}>
      <img id="headerLogo" src={logo} alt="Thobor" ref={headerLogoRef} />
      <div id="headerTexts" ref={headerTextsRef}>
        <div id="headerText">Thobor</div>
        <div className="shadowText" id="headerTextRO">RO068 | 17871</div>
      </div>
      {!isSmallScreen ? (
        <ul id="headerButtons">
          {[
            { text: 'Acasă', path: '/' },
            { text: 'Departamente', path: '/departamente' },
            { text: 'Robot', path: '/roboti' },
            { text: 'Aplicații', path: '/aplicatii' },
            { text: 'Blocks', path: '/blocks' },
          ].map(({ text, path }, index) => (
            <li key={index} ref={(el) => (headerButtonsRef.current[index] = el)}>
              <Link to={path} className="headerButton shadowText">
                {text}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="pie-menu">
          {[
            { text: 'Acasă', path: '/' },
            { text: 'Robot', path: '/roboti' },
            { text: 'Departamente', path: '/departamente' },
            { text: 'Aplicații', path: '/aplicatii' },
            { text: 'Blocks', path: '/blocks' },
          ].map(({ text, path }, index) => (
            <Link
              key={index}
              to={path}
              className={`pie-button btn${index + 1}`}
              onMouseEnter={() =>
                gsap.to(`.btn${index + 1}`, { scale: 1.1, duration: 0.3 })
              }
              onMouseLeave={() =>
                gsap.to(`.btn${index + 1}`, { scale: 1, duration: 0.3 })
              }
            >
              {text}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
