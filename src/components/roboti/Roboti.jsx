import TextIntro from "../utils/Text";
import CanvasIntro from "../utils/canvas";
import Divider from "../utils/divider";
import AwardsSection from '../utils/premii';
import AboutRobot from '../utils/aboutRobot';
import RobotIntroVideoo from '../../gifs/robotulNostru.gif';
import "../utils/styles/background.scss";
function Roboti() {
  return (
    <>
      <TextIntro textContent="Robotul nostru" customStyle={{ marginBottom: '-15vh' }}/>
      <img className = "robotVid" 
       src = {RobotIntroVideoo}
      />
      <Divider />
      <AboutRobot />
    </>
  );
}

export default Roboti;
