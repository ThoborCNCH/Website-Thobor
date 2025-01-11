import TextIntro from "../utils/Text";
import CanvasIntro from "../utils/canvas";
import Divider from "../utils/divider";
import AwardsSection from '../utils/premii';
import AboutRobot from '../utils/aboutRobot';
import Spline from '@splinetool/react-spline';

function Roboti() {
  return (
    <>
      <TextIntro textContent="Robotul nostru" customStyle={{ marginBottom: '45vh' }}/>
      <Divider />
      <Spline 
        className = "canvasContainer"
        scene="https://prod.spline.design/evdl-lHObLom2QcY/scene.splinecode" 
      />
      <AboutRobot />
    </>
  );
}

export default Roboti;
