import React from 'react';
import Spline from '@splinetool/react-spline';

import './styles/departamente.scss';

import { LazyLoadImage } from "react-lazy-load-image-component";
import thoborProiectare1  from '../../images/proiectare1.png';
import thoborProiectare2  from '../../images/proiectare2.png';
import thoborProiectare3  from '../../images/proiectare3.png';
import thoborMecanica1 from '../../images/mecanica1.png';
import thoborMecanica2 from '../../images/mecanica2.png';
import thoborJurnal1 from '../../images/thoborJurnal1.png';
import thoborJurnal3 from '../../images/thoborJurnal3.png';
import thoborJurnal4 from '../../images/thoborJurnal4.png';
import thoborJurnal5 from '../../images/jurnal5.png';
import thoborMarketing1 from '../../images/thoborMarketing1.png';
import thoborMarketing2 from '../../images/thoborMarketing2.png';
import thoborMarketing3 from '../../images/thoborMarketing3.png';
import thoborProgramare1 from '../../images/thoborProgramare1.png';
import thoborProgramare2 from '../../images/thoborProgramare2.png';
import thoborProgramare3 from '../../images/thoborProgramare3.png';
import thoborProgramare4 from '../../images/thoborProgramare4.png';

const DepartmentsList = ({ departments }) => {
  return (
    <>
     <div className="overlay-container-department">
                {/* Example: Individual elements */}
                <LazyLoadImage 
                    src={thoborJurnal1} 
                    className="element jurnal1" 
                />
                <LazyLoadImage 
                    src={thoborJurnal3} 
                    alt="Star 1" 
                    className="element jurnal3" 
                />
                <LazyLoadImage 
                    src={thoborJurnal4}  
                    alt="Star 2" 
                    className="element jurnal4" 
                />
                <LazyLoadImage 
                    src={thoborJurnal5}  
                    alt="Star 2" 
                    className="element jurnal5" 
                />
                <LazyLoadImage 
                    src={thoborMarketing1} 
                    alt="Shape 1" 
                    className="element marketing1" 
                />
                <LazyLoadImage 
                    src={thoborMarketing2} 
                    alt="Shape 1" 
                    className="element marketing2" 
                />
                <LazyLoadImage 
                    src={thoborMarketing3} 
                    alt="Shape 1" 
                    className="element marketing3" 
                />
                <LazyLoadImage 
                    src={thoborProgramare1} 
                    alt="Shape 1" 
                    className="element programare1" 
                />
                <LazyLoadImage 
                    src={thoborProgramare2} 
                    alt="Shape 1" 
                    className="element programare2" 
                />
                <LazyLoadImage 
                    src={thoborProgramare3} 
                    alt="Shape 1" 
                    className="element programare3" 
                />
                <LazyLoadImage 
                    src={thoborProgramare4} 
                    alt="Shape 1" 
                    className="element programare4" 
                />
                 <LazyLoadImage 
                    src={thoborMecanica1} 
                    alt="Shape 1" 
                    className="element mecanica1" 
                />
                <LazyLoadImage 
                    src={thoborMecanica2} 
                    alt="Shape 1" 
                    className="element mecanica2" 
                />
                <LazyLoadImage 
                    src={thoborProiectare1} 
                    alt="Shape 1" 
                    className="element proiectare1" 
                />

                <LazyLoadImage 
                    src={thoborProiectare3} 
                    alt="Shape 1" 
                    className="element proiectare3" 
                />
                {/* Add more elements as needed */}
            </div>
      <section id="departments">
      <div id="departmentsContent">
        {departments.map((department, index) => (
          <div key={index} className="departmentBox">
            <h1 className="shadowText departmentName">{department.name}</h1>
            <div className="departmentContent">
              <Spline loading = "eager" className="departmentSpline" scene={department.splineLink} />
              <p className="departmentDescription">{department.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default DepartmentsList;
