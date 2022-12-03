import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // loads tsparticles-slim
//import { loadFull } from "tsparticles"; // loads tsparticles
import { useCallback, useMemo, useState } from "react";
import { useEffect } from "react";

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
// tsParticles Repository: https://github.com/matteobruni/tsparticles
// tsParticles Website: https://particles.js.org/
const Incercare = (props) => {
  // using useMemo is not mandatory, but it's recommended since this value can be memoized if static
  let options = useMemo(() => {
    // using an empty options object will load the default options, which are static particles with no background and 3px radius, opacity 100%, white color
    // all options can be found here: https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html
    return {
      background: {
        color: "#2f2f2f", // this sets a background color for the canvas
      },
      fullScreen: {
        enable: false, // enabling this will make the canvas fill the entire screen, it's enabled by default
        zIndex: -5, // this is the z-index value used when the fullScreen is enabled, it's 0 by default
      },
      interactivity: {
        events: {
          // onClick: {
          //   enable: true, // enables the click event
          //   mode: "push", // adds the particles on click
          // },
          onHover: {
            enable: true, // enables the hover event
            mode: "repulse", // make the particles run away from the cursor
          },
        },
        modes: {
          // push: {
          //   quantity: 25, // number of particles to add on click
          // },
          repulse: {
            distance: 200, // distance of the particles from the cursor
          },
        },
      },
      particles: {
        number: {
          density: window.innerWidth > 700 ? 30 : 5,
          value: window.innerWidth > 700 ? 250 : 40,
        },
        color: {
          value: "#146622",
        },
        links: {
          color: "#26b33e",
          enable: true, // enabling this will make particles linked together
          distance: 150, // maximum distance for linking the particles
        },
        move: {
          enable: true, // enabling this will make particles move in the canvas
          speed: { min: 1, max: 10 }, // using a range in speed value will make particles move in a random speed between min/max values, each particles have its own value, it won't change in time by default
        },
        opacity: {
          value: { min: 0.3, max: 0.7 }, // using a different opacity, to have some semitransparent effects
        },
        size: {
          value: { min: 1, max: 5 }, // let's randomize the particles size a bit
        },
      },
    };
  }, []);

  // useCallback is not mandatory, but it's recommended since this callback can be memoized if static
  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
    // loadFull(engine); // for this sample the slim version is enough, choose whatever you prefer, slim is smaller in size but doesn't have all the plugins and the mouse trail feature
  }, []);

  const size = useWindowSize();

  // useEffect(() => {
  //   console.log(size.width);
  //   if (size.width <= 700) {
  //   console.log("s-a facut resize");
  //   options.particles.number.density = 5;
  //     options.particles.number.value = 40;
  //   } else {
  //   console.log("NUUUUUUUUUUUU s-a facut resize");
  //     options.particles.number.density = 30;
  //     options.particles.number.value = 250;
  //   }
  // }, [size]);

  // setting an id can be useful for identifying the right particles component, this is useful for multiple instances or reusable components
  return (
    <Particles
      id={props.id}
      init={particlesInit}
      options={options}
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: "0",
        left: "0",
      }}
    />
  );
};

export default Incercare;
