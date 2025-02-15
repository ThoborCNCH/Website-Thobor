import React, { useEffect, useState } from "react";
import cursorImage from "../../images/cursor.png"; 
import cursorHoverImage from "../../images/hover.png"; 

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState(cursorImage);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over interactive elements
      const hoverElements = ["button", "a", "input", "textarea", "select", ".clickable","headerButton"];
      const isHovering = hoverElements.some((selector) => e.target.closest(selector));

      if (isHovering) {
        if (cursorType !== cursorHoverImage) {
          setCursorType(cursorHoverImage); // Change cursor on hover
        }
      } else {
        setCursorType(cursorImage); // Default cursor otherwise
      }
    };


    window.addEventListener("mousemove", updateCursor);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
    };
  }, [cursorType]);

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: "32px", // Adjust size if needed
        height: "32px",
        backgroundImage: `url(${cursorType})`,
        backgroundSize: "cover",
        pointerEvents: "none", // Prevents interference
        transform: "translate(-50%, -50%)", // Centers cursor
        zIndex: "999999999", // Ensures it stays on top
        transition: "background-image 0.2s ease", // Smooth transition
      }}
    />
  );
};

export default CustomCursor;
