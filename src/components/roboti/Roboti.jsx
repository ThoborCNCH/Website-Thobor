
import { useEffect } from "react";
import TextIntro from "../utils/Text";
import Divider from "../utils/divider";
import AboutRobot from '../utils/aboutRobot';
import RobotIntroVideoo from '../../gifs/robotulNostru.gif';
import "../utils/styles/background.scss";
import useLoadingManager from "../utils/Loading";
import LoadingScreen from "../loading/loading";

const totalImages = 2;

function Roboti() {
  const { isLoading, handleImageLoad } = useLoadingManager(totalImages);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.68/build/spline-viewer.js";
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <TextIntro textContent="Robotul nostru" customStyle={{ marginBottom: '-30vh' }}/>
      <spline-viewer className = "video-responsiveIntro" url="https://prod.spline.design/wJU9UqvenQFypeEs/scene.splinecode"></spline-viewer>
      <Divider />
      <AboutRobot handleImageLoad={handleImageLoad} />
    </>
  );
}

export default Roboti;
