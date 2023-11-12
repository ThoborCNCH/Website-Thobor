import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useMemo } from "react";
import useWindowSize from "./WindowSize";

const Incercare = (props) => {
  const windowSize = useWindowSize();
  const style = useMemo(() => {
    return {
      width: "100vw",
      height: "100vh",
      position: "absolute",
      top: "0",
      left: "0",
    };
  }, []);

  const options = {
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
          enable: windowSize.width > 900 ? true : false,
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
        density: windowSize.width > 900 ? 20 : 5,
        value: windowSize.width > 900 ? 150 : 40,
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
