import React, { Suspense, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Vector3, Quaternion, Raycaster } from 'three'
import { useFrame } from 'react-three-fiber';
import { useBox, useCylinder, useRaycastVehicle } from '@react-three/cannon';

import { useWheels } from './useWheels';
import { useControls } from './useControls';
import { WheelDebug } from './WheelDebug';
import { useState } from 'react';
import { useEffect } from 'react';
import Brat from './Brat';

import DoamneIartaCeUrmeaza from './DoamneIartaCeUrmeaza';

export default function Lokione(props) {

  const { nodes, materials } = useGLTF("/robotNou.glb");

  const position = [22.5, 0, 38];
  const width = 6;
  const height = 2; //.84
  const front = 2.8;
  const wheelRadius = 1.1;

  const cameras = {
    1: new Vector3(47, 40, 0),
    2: new Vector3(47, 40, 47),
    3: new Vector3(0, 40, 47),
    4: new Vector3(-47, 40, 47),
    5: new Vector3(-47, 40, 0),
    6: new Vector3(-47, 40, -47),
    7: new Vector3(0, 40, -47),
    8: new Vector3(47, 40, -47),
    9: new Vector3(0, 69, 0),
  }

  const [bratPosition, setBratPosition] = useState(-4.5);
  const [bratApuca, setBratApuca] = useState(true);
  const bratIncrease = 0.2;

  const [cameraController, setCamController] = useState(false);

  var robotPosition;
  var robotRotation;

  const [controls, setControls] = useState({});
  
  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisAPI] = useBox(
    () => ({
      args: chassisBodyArgs,
      mass: 150,
      position
    }),
    useRef(null)
    );
    DoamneIartaCeUrmeaza.robotBody = chassisBody;
    DoamneIartaCeUrmeaza.robotApi = chassisAPI;
    

  const [bratBody, bratAPI] = useBox(
    () => ({
      // args: [0.3, 0.3, 2, 32],
      args: [2, 1, 2],
      position: [0, 0, 0],
      type: 'Static'
    }),
    useRef(null)
  )
  DoamneIartaCeUrmeaza.bratBody = bratBody;
  DoamneIartaCeUrmeaza.bratApi = bratAPI;


  // useEffect(() => {

  //   let viata = new Vector3(0, 0, 0);
  //   viata.setFromMatrixPosition(chassisBody.current.matrixWorld);
  //   var raycast = new Raycaster();
  //   raycast.far = 100
  //   raycast.set(new Vector3(0, 1, 0), new Vector3(0, 0, 0))
  //   // console.log(raycast.ray.distanceToPoint(viata))
  //   // console.log(raycast.intersectObjects(chassisBody))

  //   // let mama = new Vector3(0, 0, 0)
  //   // mama.setFromMatrixPosition(DoamneIartaCeUrmeaza.robotBody.current.matrixWorld)
  //   // console.log(mama)

  // })

  useEffect(() => {

    const keyDown = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: true
      }));
    }

    const keyUp = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: false
      }));
    }

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };

  }, []);

  useEffect(() => {

    DoamneIartaCeUrmeaza.controls = controls

    if (controls.f)
      setBratApuca(!bratApuca);

    if (controls.shift)
      if (bratPosition <= 12) {
        setBratPosition(bratPosition + bratIncrease);
        // bratPosition += bratIncrease;
      }

    if (controls.control)
      if (bratPosition >= -6) {
        setBratPosition(bratPosition - bratIncrease);
        // bratPosition -= bratIncrease
      }
    // bratAPI.position.set(0, bratPosition, -10);

    // if (bratApuca) {
    //   bratAPI.position.set(10000, bratPosition, 100000);
    // } else {
    //   bratAPI.position.set(0, bratPosition, -10);
    // }

    // bratCollisionAPI.position.set(bratPosition.x, bratPosition.y, bratPosition.z);

    if (controls[0])
      setCamController(false);
    for (let k = 1; k <= 9; k++)
      if (controls[k])
        setCamController(true);

  }, [controls]);

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

  //POSIBIL CONTROLLER PENTRU COLIZIUNEA BRATULUI DACA EXISTA
  useFrame((state) => {
    robotPosition = new Vector3(0, 0, 0);
    robotPosition.setFromMatrixPosition(chassisBody.current.matrixWorld);
    robotRotation = new Quaternion(0, 0, 0, 0);
    robotRotation.setFromRotationMatrix(chassisBody.current.matrixWorld);

    let holiad = bratPosition + 2.7
    let vec = new Vector3(0, holiad, -4.6);

    vec.applyQuaternion(robotRotation)

    let bratPose = vec.clone().add(robotPosition);

    bratAPI.position.copy(bratPose);
  })

  // AICI AR FI CONTROLLER UL PENTRU CAMERA POATE MERGE
  useFrame((state) => {
    if (cameraController) {
      let position = new Vector3(0, 0, 0);
      let quaternion = new Quaternion(0, 0, 0, 0);
      let wDir = new Vector3(0, 0, 10);
      wDir.applyQuaternion(quaternion);
      wDir.normalize();

      for (let k = 1; k <= 9; k++)
        if (controls[k]) {
          var cameraPosition = position.clone().add(wDir.clone().multiplyScalar(1).add(cameras[k]));
          state.camera.position.copy(cameraPosition);
        }


    } else {

      let position = new Vector3(0, 0, 0);
      position.setFromMatrixPosition(chassisBody.current.matrixWorld);
      // chassisAPI.position.set(vehicle.current.matrixWorld);

      let quaternion = new Quaternion(0, 0, 0, 0);
      quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

      let wDir = new Vector3(0, 0, 10);
      // let wDir = new Quaternion(0, 0, 0, 0);
      wDir.applyQuaternion(quaternion);
      wDir.normalize();

      let cameraPosition = position.clone().add(wDir.clone().multiplyScalar(20).add(new Vector3(0, 32, 0)));

      // wDir.add(new Vector3(0, 0.2, 0));
      state.camera.position.copy(cameraPosition);
      state.camera.lookAt(position);
    }

  });

  return (
    <Suspense callback={null}>
      <group {...props} dispose={null} ref={vehicle} name="vehicle">
        {/* <group ref={bratBody}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 12, 32]} />
            <meshPhongMaterial attach={"material"} color="B00B00" />
          </mesh>
        </group> */}
        <group ref={bratBody}>
          <mesh>
            <meshPhongMaterial color={"#000000"} attach={"material"} />
            {/* <cylinderGeometry args={[0.3, 0.3, 2, 32]} attach={"geometry"} /> */}
            <boxGeometry args={[2, 1, 2]} attach={"geometry"} />
          </mesh>
          {/* <group scale={[0.3, 0.3, 0.3]} rotation={[0, Math.PI, 0]} >
            <Brat />
          </group> */}
        </group>
        <group>
          <WheelDebug wheelRef={wheels[0]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[1]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[2]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[3]} wheelRadius={wheelRadius} />
        </group>
        <group ref={chassisBody}>
          <group>
            {/* position={[0, 0, 11.2]} */}
            <group scale={[0.3, 0.3, 0.3]} rotation={[0, Math.PI, 0]} position={[-0.67, bratPosition, 1.2]}>
              <Brat />
            </group>
          </group>
          <mesh ref={chassisBody}>
            <boxGeometry args={[6, 1.5, 6]} />
            <meshPhongMaterial attach={"material"} color="#FFFF00" transparent opacity={0} />
          </mesh>
          <WheelDebug wheelRef={wheels[0]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[1]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[2]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[3]} wheelRadius={wheelRadius} />
          <group scale={[0.3, 0.3, 0.3]} ref={chassisBody} name="chassisBody">
            <group rotation={[0, Math.PI, 0]} position={[-1.5, -12, 3]}>

              <mesh
                castShadow
                receiveShadow
                geometry={nodes.suport_baterie.geometry}
                material={materials.verde}
                position={[-8.31, 10, 8.55]}
                rotation={[0, -1.57, 0]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.baterie.geometry}
                material={materials["Material.003"]}
                position={[-8.36, 10.78, 8.2]}
                rotation={[0, 1.57, 0]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["REV-31-1153_v1"].geometry}
                material={materials["Material.003"]}
                position={[-9.12, 13.85, -5.03]}
                rotation={[-Math.PI, -1.57, 0]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["REV-31-1153_v1001"].geometry}
                material={materials["Material.003"]}
                position={[-9.12, 13.85, 1.48]}
                rotation={[0, 1.57, 0]}
                scale={-0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.FL.geometry}
                material={materials["negru roti"]}
                position={[7.37, 7.83, 11.39]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.FLcover.geometry}
                material={materials["galben "]}
                position={[8.02, 7.78, 11.36]}
                rotation={[0, 0, -Math.PI / 2]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.FR.geometry}
                material={materials["negru roti"]}
                position={[-11.14, 7.83, 11.39]}
                rotation={[-Math.PI, 0, -Math.PI / 2]}
                scale={-0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.channel_baterie.geometry}
                material={materials["Material.001"]}
                position={[-10.02, 14.61, -0.89]}
                rotation={[Math.PI / 2, 0, Math.PI]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.FRcover.geometry}
                material={materials["galben "]}
                position={[-11.78, 7.78, 11.36]}
                rotation={[-Math.PI, 0, -Math.PI / 2]}
                scale={-0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.RRcover.geometry}
                material={materials["galben "]}
                position={[-11.78, 7.78, -6.32]}
                rotation={[Math.PI, 0, Math.PI / 2]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane023.geometry}
                material={materials["Material.003"]}
                position={[-1.86, 7.87, -7.64]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.RLcover.geometry}
                material={materials["galben "]}
                position={[8.05, 7.78, -6.32]}
                rotation={[0, 0, Math.PI / 2]}
                scale={-0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.RR.geometry}
                material={materials["negru roti"]}
                position={[-11.14, 7.83, -6.35]}
                rotation={[Math.PI, 0, Math.PI / 2]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle002.geometry}
                material={materials["Material.001"]}
                position={[-1.49, 12.7, 9.87]}
                scale={0.04}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle003.geometry}
                material={materials["Material.001"]}
                position={[-3.58, 12.7, 9.81]}
                rotation={[-Math.PI, 0, 0]}
                scale={-0.04}
              />
              {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle004.geometry}
                material={materials["Material.001"]}
                position={[-1.49, 12.11, 9.87]}
                scale={0.04}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle005.geometry}
                material={materials["Material.001"]}
                position={[-3.58, 12.11, 9.81]}
                rotation={[-Math.PI, 0, 0]}
                scale={-0.04}
              /> */}
              {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes["gheara-noua-1-1"].geometry}
                material={materials["Material.005"]}
                position={[-4.22, 12.41, 11.36]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.04}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["gheara-noua-1-1001"].geometry}
                material={materials["Material.005"]}
                position={[-0.88, 12.41, 11.45]}
                rotation={[Math.PI / 2, 0, Math.PI]}
                scale={0.04}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["gheara-noua-1-1002"].geometry}
                material={materials["Material.005"]}
                position={[-4.22, 11.84, 11.36]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.04}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes["gheara-noua-1-1003"].geometry}
                material={materials["Material.005"]}
                position={[-0.88, 11.84, 11.45]}
                rotation={[Math.PI / 2, 0, Math.PI]}
                scale={0.04}
              /> */}
              {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes["Gheara-sup"].geometry}
                material={materials["Material.005"]}
                position={[-2.52, 15.08, 4.43]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={0.06}
              /> */}
              {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes["Prindere-gh-de-gls"].geometry}
                material={materials["Material.005"]}
                position={[-1.41, 16.24, -3.42]}
                scale={0.06}
              /> */}
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.MotorMosor.geometry}
                material={materials["Material.002"]}
                position={[4.59, 13.58, 0.06]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle055.geometry}
                material={materials.verde}
                position={[4.5, 13.63, -4.66]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.glisiera.geometry}
                material={materials["Material.001"]}
                position={[4.62, 22.28, -6.36]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={[0.06, 0.06, 0.37]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.glisiera001.geometry}
                material={materials["Material.001"]}
                position={[3.05, 22.28, -6.36]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={[0.06, 0.06, 0.37]}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.glisiera002.geometry}
                material={materials["Material.001"]}
                position={[1.47, 22.28, -6.36]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={[0.06, 0.06, 0.37]}
              />
              {/* <mesh
                castShadow
                receiveShadow
                geometry={nodes.glisiera003.geometry}
                material={materials["Material.001"]}
                position={[-0.11, 22.28, -6.36]}
                rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                scale={[0.06, 0.06, 0.37]}
              /> */}
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane045.geometry}
                material={materials.negru}
                position={[4.58, 35.3, -5.86]}
                rotation={[0, -1.57, 0]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane047.geometry}
                material={materials.negru}
                position={[2.99, 35.3, -5.86]}
                rotation={[0, -1.57, 0]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane049.geometry}
                material={materials.negru}
                position={[1.43, 35.3, -5.86]}
                rotation={[0, -1.57, 0]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.RL.geometry}
                material={materials["negru roti"]}
                position={[7.41, 7.83, -6.35]}
                rotation={[0, 0, Math.PI / 2]}
                scale={-0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.profil_6_gauri002.geometry}
                material={materials["Material.001"]}
                position={[4.55, 11.29, -0.22]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.profil_13_gauri.geometry}
                material={materials["Material.001"]}
                position={[4.56, 8.29, 2.62]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.profil_6_gauri001.geometry}
                material={materials["Material.001"]}
                position={[-1.94, 8.29, 1.18]}
                rotation={[0, 1.57, 0]}
                scale={0.06}
              />
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.profil_13_gauri001.geometry}
                material={materials["Material.001"]}
                position={[-8.29, 8.29, 2.62]}
                scale={0.06}
              />


            </group>
          </group>
        </group>
      </group>
    </Suspense>
  )
}

// useGLTF.preload('/robotNou.gltf');
// useGLTF.preload("/robotNou.glb");
useGLTF.preload("/robotNou.glb");
