import TextIntro from "../utils/Text";
import Divider from "../utils/divider";
import AboutRobot from '../utils/aboutRobot';
import RobotIntroVideoo from '../../gifs/robotulNostru.gif';
import "../utils/styles/background.scss";
import useLoadingManager from "../utils/Loading";
import LoadingScreen from "../loading/loading";

const totalImages = 4;

function Roboti() {
  const { isLoading, handleImageLoad } = useLoadingManager(totalImages);


  return (
    <>
      {isLoading && <LoadingScreen />}
      <TextIntro textContent="Robotul nostru" customStyle={{ marginBottom: '-15vh' }}/>
      <img className = "robotVid" src = {RobotIntroVideoo} onLoad = {handleImageLoad} alt=""/>
      <Divider />
      <AboutRobot handleImageLoad={handleImageLoad} />
    </>
  );
}

export default Roboti;
