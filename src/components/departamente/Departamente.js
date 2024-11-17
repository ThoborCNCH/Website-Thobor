import TextIntro from "../utils/text";
import Divider from "../utils/divider";
import DepartmentsList from "../utils/departmentList";
import Spline from '@splinetool/react-spline';
import { departments } from '../../departmentData';

function Departamente() {
  return (
    <>
      <TextIntro textContent="Departamente" customStyle={{ marginBottom: '-35vh' }}/>
      <Spline scene="https://prod.spline.design/rAtLw4ktobuKxmdV/scene.splinecode" /> 
      <Divider />
      <DepartmentsList departments={departments} />
    </>
  );
}

export default Departamente;
