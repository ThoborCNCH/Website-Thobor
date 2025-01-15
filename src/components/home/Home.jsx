import TextIntro from "../utils/Text";
import CanvasIntro from "../utils/canvas";
import Divider from "../utils/divider";
import AboutSection from '../utils/aboutSection';
import AwardsSection from '../utils/premii';
import { motion } from "framer-motion";
import robotIntro from "../../videos/introRobotHome.webm";

const pageVariants = {
  initial: {  opacity: 0 },
  animate: {  opacity: 1 },
  exit: { opacity: 0 },
};

function Home() {
  return (
    <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 2 }}
        style={{ padding: "0px", textAlign: "center" }}
    >
      <TextIntro customStyle={{marginBottom: '-10vh' }}/>
      <video className = "video-responsiveIntro" width="645" loop autoPlay muted disablepictureinpicture controlslist="nodownload noplaybackrate nofullscreen">
              <source src={robotIntro} type="video/webm" />
              Your browser does not support the video tag.
      </video>
      <Divider/>
      <AboutSection/>
      <Divider />
      <AwardsSection/>
    </motion.div>
  );
}

export default Home;
