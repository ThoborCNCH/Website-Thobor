import React from 'react';
import Spline from '@splinetool/react-spline';

const DepartmentsList = ({ departments }) => {
  return (
    <div id="departments" style={{ flexDirection: 'column' }}>
      {departments.map((department, index) => (
        <div key={index} className="grid-container">
          <div className="header">
            <h1 
            style = {{marginBottom : '-25vh', }}
            className="textCenter shadowText">{department.name}
            </h1>
          </div>
          <div className="column">
            <Spline 
            scene={department.splineLink} 
             style={{
                position: 'anchored',

                zIndex: -1, 
              }}
            
            />
          </div>
          <div className="column">
            <div className="despreBox">
              <p id="despreText">{department.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentsList;
