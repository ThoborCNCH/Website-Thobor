import React, { Suspense, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Vector3, Quaternion } from 'three'
import { useFrame } from 'react-three-fiber';
import { useBox, useRaycastVehicle } from '@react-three/cannon';

import { useWheels } from './useWheels';
import { useControls } from './useControls';
import { WheelDebug } from './WheelDebug';

export default function Lokione(props) {

  const { nodes, materials } = useGLTF('/loki1.glb');

  const position = [7, 7, 23];
  const width = 9;
  const height = 9; //.84
  const front = 5.2;
  const wheelRadius = 1.1;

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisAPI] = useBox(
    () => ({
      args: chassisBodyArgs,
      mass: 150,
      position
    }),
    useRef(null)
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [vehicle, vehicleAPI] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels
    }),
    useRef(null),
  );

  useControls(vehicleAPI, chassisAPI);

  // useFrame(() => {
  //   // Get the position and orientation of the robot
  //   const robotPosition =  chassisBody.current.position;
  //   const robotQuaternion = chassisBody.current.quaternion;

  //   // Set the camera's position to be behind the robot
  //   cameraRef.current.position.set(
  //     robotPosition.x - 10 * Math.sin(robotQuaternion.y),
  //     robotPosition.y + 5,
  //     robotPosition.z - 10 * Math.cos(robotQuaternion.y)
  //   );

  //   // Set the camera's orientation to match the robot's orientation
  //   cameraRef.current.quaternion.copy(robotQuaternion);
  // });

  useFrame((state) => {
    // return;
    if (false) {

      let position = new Vector3(0, 0, 0);
      position.setFromMatrixPosition(chassisBody.current.matrixWorld);

      let quaternion = new Quaternion(0, 0, 0, 0);
      quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

      let wDir = new Vector3(0, 0, 1);
      wDir.applyQuaternion(quaternion);
      wDir.normalize();

      let cameraPosition = position.clone().add(wDir.clone().multiplyScalar(0).add(new Vector3(0, 5, 1)));
      state.camera.position.copy(cameraPosition);
      state.camera.lookAt(new Vector3(0, 0, 0));

    } else {

      let position = new Vector3(0, 0, 0);
      position.setFromMatrixPosition(chassisBody.current.matrixWorld);

      let quaternion = new Quaternion(0, 0, 0, 0);
      quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

      let wDir = new Vector3(0, 0, 10);
      // let wDir = new Quaternion(0, 0, 0, 0);
      wDir.applyQuaternion(quaternion);
      wDir.normalize();

      let cameraPosition = position.clone().add(wDir.clone().multiplyScalar(10).add(new Vector3(0, 40, 0)));

      // wDir.add(new Vector3(0, 0.2, 0));
      state.camera.position.copy(cameraPosition);
      state.camera.lookAt(position);
    }
  });

  return (
    <Suspense callback={null}>
      <group {...props} dispose={null} ref={vehicle} name="vehicle">
        <group ref={chassisBody}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[10, 9, 10]} />
            <meshPhongMaterial attach={"material"} color="#FFFF0000" transparent opacity={0} />
          </mesh>
          <WheelDebug wheelRef={wheels[0]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[1]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[2]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[3]} wheelRadius={wheelRadius} />
          <group scale={[0.24, 0.26, 0.24]} ref={chassisBody} name="chassisBody">
            <group rotation={[Math.PI / 2, 0, 3 * Math.PI / 2]} position={[0, -8, 0]}>
              <mesh geometry={nodes.Body1298.geometry} material={materials['Plastic - Glossy (Black)']} />
              <mesh geometry={nodes.Body1298_1.geometry} material={materials['Aluminum - Bead Blasted']} />
              <mesh geometry={nodes.Body1298_2.geometry} material={materials['Plastic - Glossy (Green).001']} />
              <mesh geometry={nodes.Body1298_3.geometry} material={materials['Opaque(191,191,191).001']} />
              <mesh geometry={nodes.Body1298_4.geometry} material={materials['Opaque(255,255,255).001']} />
              <mesh geometry={nodes.Body1298_5.geometry} material={materials['Plastic - Glossy (Red).001']} />
              <mesh geometry={nodes.Body1298_6.geometry} material={materials['Opaque(228,233,237).001']} />
              <mesh geometry={nodes.Body1298_7.geometry} material={materials['Opaque(198,193,188).001']} />
              <mesh geometry={nodes.Body1298_8.geometry} material={materials['Opaque(192,192,192).001']} />
              <mesh geometry={nodes.Body1298_9.geometry} material={materials['Opaque(63,63,63).001']} />
              <mesh geometry={nodes.Body1298_10.geometry} material={materials['Opaque(202,209,238).001']} />
              <mesh geometry={nodes.Body1298_11.geometry} material={materials['Opaque(203,210,239).001']} />
              <mesh geometry={nodes.Body1298_12.geometry} material={materials['Opaque(229,235,237).001']} />
              <mesh geometry={nodes.Body1298_13.geometry} material={materials['Opaque(229,229,229).001']} />
              <mesh geometry={nodes.Body1298_14.geometry} material={materials['Opaque(165,158,150).001']} />
              <mesh geometry={nodes.Body1298_15.geometry} material={materials['Opaque(64,64,64).001']} />
              <mesh geometry={nodes.Body1298_16.geometry} material={materials['Opaque(2,61,210).001']} />
              <mesh geometry={nodes.Body1298_17.geometry} material={materials['Opaque(221,232,255)']} />
              <mesh geometry={nodes.Body1298_18.geometry} material={materials['Steel - Satin.001']} />
              <mesh geometry={nodes.Body1298_19.geometry} material={materials['Opaque(153,153,153)']} />
              <mesh geometry={nodes.Body1298_20.geometry} material={materials['Opaque(69,69,69).001']} />
              <mesh geometry={nodes.Body1298_21.geometry} material={materials['Opaque(105,77,59).001']} />
              <mesh geometry={nodes.Body1298_22.geometry} material={materials['Opaque(190,188,186).001']} />
              <mesh geometry={nodes.Body1298_23.geometry} material={materials['Opaque(247,247,229).001']} />
              <mesh geometry={nodes.Body1298_24.geometry} material={materials.Generic} />
              <mesh geometry={nodes.Body1298_25.geometry} material={materials['Generic.002']} />
              <mesh geometry={nodes.Body1298_26.geometry} material={materials['Generic.004']} />
              <mesh geometry={nodes.Body1298_27.geometry} material={materials['Opaque(89,89,89).001']} />
              <mesh geometry={nodes.Body1298_28.geometry} material={materials['Opaque(204,204,204).001']} />
              <mesh geometry={nodes.Body1298_29.geometry} material={materials['Opaque(221,221,13).001']} />
              <mesh geometry={nodes.Body1298_30.geometry} material={materials['Opaque(28,28,28).001']} />
              <mesh geometry={nodes.Body1298_31.geometry} material={materials['Opaque(221,221,227).001']} />
              <mesh geometry={nodes.Body1298_32.geometry} material={materials['Opaque(158,103,51).001']} />
              <mesh geometry={nodes.Body1298_33.geometry} material={materials['Opaque(255,242,232)']} />
              <mesh geometry={nodes.Body1298_34.geometry} material={materials['Opaque(160,160,160).001']} />
              <mesh geometry={nodes.Body1298_35.geometry} material={materials['Opaque(46,46,46)']} />
              <mesh geometry={nodes.Body1298_36.geometry} material={materials['Opaque(255,199,168)']} />
              <mesh geometry={nodes.Body1298_37.geometry} material={materials['Aluminum - Anodized Rough (Grey)']} />
            </group>
          </group>
        </group>
      </group>
    </Suspense>
  )
}

useGLTF.preload('/loki1.glb')
