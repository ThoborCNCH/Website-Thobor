import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(CSSPlugin, ScrollTrigger, ScrollToPlugin);

/*
const CanvasIntro = ({canvasId = 'https://prod.spline.design/R-4gGMEspHTLpsWU/scene.splinecode'}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const app = new Application(canvas);

    // Load the first scene
    app.load(canvasId).then(() => {
      const obj = app.findObjectByName('Cuerpo');
      if (obj) {
        gsap.set(obj.position, { x: 0, y: -200, z: 0 });
        gsap.set(obj.scale, { x: 1, y: 1, z: 1 });

        gsap.to(canvas, { opacity: 1, duration: 1, delay: 2, ease: 'power2.out' });
      }
    });

    // Cleanup function
    return () => {
      app.dispose(); // Clean up the app instance
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="canvas3D"
        className="canvasContainer"
        data-engine="three.js r149"
      ></canvas>
    </div>
  );
};

export default CanvasIntro;
*/
