import React, { useEffect, useState } from "react";
import cursorImage from "../../images/cursor.png";
import cursorHoverImage from "../../images/hover.png";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState(cursorImage);
  const [isDisabled, setIsDisabled] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDisabled(window.innerWidth < 1024);
    };

    const updateCursor = (e) => {
      if (isDisabled) return; // Stop updating cursor if disabled

      setPosition({ x: e.clientX, y: e.clientY });

      const hoverElements = ["button", "a", "input", "textarea", "select", ".clickable", "headerButton"];
      const isHovering = hoverElements.some((selector) => e.target.closest(selector));

      if (isHovering) {
        if (cursorType !== cursorHoverImage) {
          setCursorType(cursorHoverImage);
        }
      } else {
        setCursorType(cursorImage);
      }
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("resize", handleResize);
    };
  }, [cursorType, isDisabled]);

  // Apply CSS to hide system cursor on small screens
  useEffect(() => {
    if (isDisabled) {
      document.body.style.cursor = "none"; // Hide system cursor
    } else {
      document.body.style.cursor = "default"; // Reset cursor when back on desktop
    }

    return () => {
      document.body.style.cursor = "default"; // Ensure cursor resets when component unmounts
    };
  }, [isDisabled]);

  if (isDisabled) return null; // Don't render custom cursor on mobile

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: "32px",
        height: "32px",
        backgroundImage: `url(${cursorType})`,
        backgroundSize: "cover",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: "999999999",
        transition: "background-image 0.2s ease",
      }}
    />
  );
};

export default CustomCursor;