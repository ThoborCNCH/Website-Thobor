import React, { useEffect, useState } from "react";
import cursorImage from "../../images/cursor.png";
import cursorHoverImage from "../../images/hover.png";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState(cursorImage);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const updateCursor = (e) => {
      if (isMobile) return; // Stop updating cursor on mobile

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
  }, [cursorType, isMobile]);

  if (isMobile) return null; // Don't render cursor on mobile

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
