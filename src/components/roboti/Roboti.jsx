import TextIntro from "../utils/Text";
import CanvasIntro from "../utils/canvas";
import Divider from "../utils/divider";
import AwardsSection from '../utils/premii';
import AboutRobot from '../utils/aboutRobot';
import RobotIntroVideoo from '../../videos/introRobot.webm';
import "../utils/styles/background.scss";
function Roboti() {
  return (
    <>
      <TextIntro textContent="Robotul nostru" customStyle={{ marginBottom: '-15vh' }}/>
      <video className = "robotVid" width="1920" weight = "1080" loop autoPlay muted playsInline>
       
        <source src={RobotIntroVideoo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Divider />
      <AboutRobot />
    </>
  );
}

export default Roboti;
