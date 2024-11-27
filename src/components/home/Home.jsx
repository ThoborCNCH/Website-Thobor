import TextIntro from "../utils/text";
import CanvasIntro from "../utils/canvas";
import Divider from "../utils/divider";
import AboutSection from '../utils/aboutSection';
import AwardsSection from '../utils/premii';
import Spline from '@splinetool/react-spline';
import { motion } from "framer-motion";

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
      <TextIntro customStyle={{ }}/>
      <Spline 
        className = "canvasContainer"
        scene="https://prod.spline.design/7WrLJQCGAUSYehDT/scene.splinecode" 
      />
      <Divider/>
      <AboutSection/>
      <Divider />
      <AwardsSection/>
    </motion.div>
  );
}

export default Home;
