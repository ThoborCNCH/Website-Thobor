import TextIntro from "../utils/Text";
import Divider from "../utils/divider";
import DepartmentsList from "../utils/departmentList";
import { departments } from '../../departmentData';
import { motion } from "framer-motion";
import robotiDepart from "../../videos/roboti-section.webm";
import React, { useEffect, useRef, useState } from 'react';

const pageVariants = {
  initial: { opacity: 0,  },
  animate: {opacity: 1 },
  exit: { opacity: 0 },
};


function Departamente() {

  return (
    <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 2 }}
        style={{ padding: "0px", textAlign: "center" }}
    >

      <TextIntro textContent="Departamente" customStyle={{ marginBottom: '-25vh' }}/>
            <video className = "video-responsiveMainDepartament" width="1200" weight = "1200" loop autoPlay muted disablepictureinpicture controlslist="nodownload noplaybackrate nofullscreen"> 
                    <source src={robotiDepart} type="video/webm" />
                    Your browser does not support the video tag.
            </video>
      <Divider />
      <DepartmentsList departments={departments} />
    </motion.div>
  );
}

export default Departamente;
