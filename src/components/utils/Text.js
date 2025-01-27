import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, CSSPlugin, ScrollToPlugin } from 'gsap/all';
import './styles/text.scss';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, CSSPlugin, ScrollToPlugin, useGSAP);

const TextIntro = ({ textContent = "We are THOBOR", customStyle = {} }) => {
  useGSAP(() => {
    const handlePageLoad = () => {
      const text = document.getElementById("introText");
      const lines = text.innerHTML.split("<br>"); // Split the text into lines
      text.innerHTML = ""; // Clear the text content to add new elements

      lines.forEach((line, lineIndex) => {
        const lineContainer = document.createElement("div"); // Create a div for each line
        lineContainer.style.textAlign = "center"; // Center align the line container
        lineContainer.style.width = "100%"; // Ensure full width for centering
        const letters = line.split(""); // Split the line into characters

        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0 }); // Timeline for animation loop

        letters.forEach((letter, index) => {
          const span = document.createElement("span"); // Create a span for each letter
          span.textContent = letter === " " ? "\u00A0" : letter; // Use a non-breaking space for spaces
          span.style.display = "inline-block"; // Inline-block for animation
          lineContainer.appendChild(span); // Append span to line container

          // Initial fade-in animation for each letter
          gsap.fromTo(span, {
            opacity: 0,
            y: 50, // Start from below
            rotationY: 90, // Rotate along Y-axis
          }, {
            duration: 0.5,
            opacity: 1,
            y: 0, // End position
            rotationY: 0, // No rotation at end
            delay: index * 0.1, // Stagger animation
            ease: "power2.out",
          });

          // Wiggle effect
          timeline.to(span, {
            scale: 1.05,
            yoyo: true,
            duration: 0.3,
            ease: "sine.inOut",
            repeat: 1,
          }, index * 0.1); // Staggered delay for each letter
        });

        text.appendChild(lineContainer); // Append the line container to the main text element
      });
    };

    // Trigger the animation when the page is fully loaded
    window.addEventListener('load', handlePageLoad);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('load', handlePageLoad);

      // Make sure to clean up GSAP animations
      gsap.globalTimeline.clear(); // Clear all GSAP animations globally to avoid memory leaks
    };
  }, []);

  return (
    <div className="textCenter" style={customStyle}>
      <div className="textIntro shadowText" id="introText">
        {textContent}
      </div>
    </div>
  );
};

export default TextIntro;
