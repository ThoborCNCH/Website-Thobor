import TextIntro from "../utils/text";
import Divider from "../utils/divider";
import DepartmentsList from "../utils/departmentList";
import Spline from '@splinetool/react-spline';
import { departments } from '../../departmentData';
import { motion } from "framer-motion";
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
      <Spline loading = "eager" scene="https://prod.spline.design/rAtLw4ktobuKxmdV/scene.splinecode" /> 
      <Divider />
      <DepartmentsList departments={departments} />
    </motion.div>
  );
}

export default Departamente;
