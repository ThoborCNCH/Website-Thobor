import TextIntro from "../utils/Text";
import Divider from "../utils/divider";
import DepartmentsList from "../utils/departmentList";
import { departments } from '../../departmentData';
import { motion } from "framer-motion";
import useLoadingManager from "../utils/Loading";
import LoadingScreen from "../loading/loading";
import robotiDepart from "../../gifs/roboti-section.gif";
import React from 'react';

const pageVariants = {
  initial: { opacity: 0,  },
  animate: {opacity: 1 },
  exit: { opacity: 0 },
};

const totalImages = 6;

function Departamente() {
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
      <TextIntro textContent="Departamente" customStyle={{ marginBottom: '-25vh' }}/>
            <img className = "video-responsiveMainDepartament" src={robotiDepart} onLoad = {handleImageLoad} alt=""/>
      <Divider />
      <DepartmentsList departments={departments} handleImageLoad={handleImageLoad} />
    </motion.div>
  );
}

export default Departamente;
