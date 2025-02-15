import TextIntro from "../utils/Text";
import Divider from "../utils/divider";
import AboutSection from '../utils/aboutSection';
import AwardsSection from '../utils/premii';
import { motion } from "framer-motion";
import LoadingScreen from "../loading/loading";
import useLoadingManager from "../utils/Loading";
import robotIntro from "../../gifs/introRobotHome.gif";

const pageVariants = {
  initial: {  opacity: 0 },
  animate: {  opacity: 1 },
  exit: { opacity: 0 },
};

const totalImages = 3;
function Home() {
  const { isLoading, handleImageLoad } = useLoadingManager(totalImages);

  return (
    <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 2 }}
        style={{ padding: "0px", textAlign: "center" }}
    >
      {isLoading && <LoadingScreen />}
      <TextIntro customStyle={{marginBottom: '-10vh' }}/>
      <img className = "video-responsiveIntro" src={robotIntro} onLoad={handleImageLoad} alt=""/> 
      <Divider/>
      <AboutSection  handleImageLoad={handleImageLoad}/>
      <Divider />
      <AwardsSection/>
    </motion.div>
  );
}

export default Home;
