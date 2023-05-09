import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useMemo } from "react";
import "./Incercare.css";

const Incercare = (props) => {
  let style = useMemo(() => {
    return {
      width: "100vw",
      height: "100vh",
      position: "absolute",
      top: "0",
      left: "0",
    };
  });

  let options = useMemo(() => {
    return {
      background: {
        color: "#2f2f2f",
      },
      fullScreen: {
        enable: false,
        zIndex: -5,
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 200,
          },
        },
      },
      particles: {
        number: {
          density: window.innerWidth > 700 ? 20 : 5,
          value: window.innerWidth > 700 ? 150 : 40,
        },
        color: {
          value: "#146622",
        },
        links: {
          color: "#26b33e",
          enable: true,
          distance: 150,
        },
        move: {
          enable: true,
          speed: { min: 1, max: 4 },
        },
        opacity: {
          value: { min: 0.3, max: 0.7 },
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
    };
  }, []);

  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
  }, []);

  return (
    <Particles
      id={props.id}
      className="tsparticles"
      init={particlesInit}
      options={options}
      style={style}
    />
  );
};

export default Incercare;
