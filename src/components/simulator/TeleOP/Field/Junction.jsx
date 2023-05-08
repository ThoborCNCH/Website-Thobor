import { useRef } from "react";
import { useBox, useCylinder, useSpring } from "@react-three/cannon";
import { CylinderGeometry } from "three";

export const Junction = ({ position, height, planeRef }) => {

  var realPose = [position[0], (position[1] + height / 2 + 1.5), position[2]];

  const [planeBody, planeAPI] = useBox(() => ({
    args: [10, 0.1, 10],
    position: [0, -0.1, 0],
    type: 'Static'
  }), useRef(null));

  const [junctionBody, junctionAPI] = useBox(() => ({
    // Set the dimensions of the box
    args: [0.05, height / 2, 0.05],
    // Set the position and orientation of the body
    position: [position[0], position[1] + height / 2, position[2]],
    // position: realPose,
    mass: 0,
    type: 'Dynamic',
    // quaternion: new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), 0),
  }), useRef(null));

  const [junctionBodyCylinder, junctionAPICylinder] = useCylinder(() => ({
    args: [0.05, 0.05, height, 32],
    position: [position[0], position[1] + height / 2, position[2]],
    mass: 0,
    type: 'Static'
  }), useRef(null));

  const spring = useSpring(() => ({
    bodyA: planeBody.current,
    bodyB: junctionBody.current,
    length: 5,
    stiffness: 100,
    damping: 0
  }));

  return (

    <mesh ref={junctionBodyCylinder}>
      <cylinderGeometry attach="geometry" args={[0.5, 0.5, height, 32]} />
      <meshBasicMaterial attach="material" color="#FFFF00" />
      <mesh position={[0, height / 2 + 0.12 / 2, 0]}>
        <cylinderGeometry attach="geometry" args={[0.5, 0.5, 0.12, 32]} />
        <meshBasicMaterial attach="material" color="#000000" />
      </mesh>
      <mesh position={[0, -height / 2 - 1.5 / 2, 0]}>
        <cylinderGeometry attach="geometry" args={[0.5 / 2, 0.5 / 2, 1.5, 32]} />
        <meshBasicMaterial attach="material" color="#808080" />
      </mesh>
      <mesh position={[0, -height / 2, 0]}>
        <cylinderGeometry attach="geometry" args={[1.5, 1.5, .01, 32]} />
        <meshBasicMaterial attach={"material"} color="#5B5C5C" />
      </mesh>
    </mesh>
  );
};