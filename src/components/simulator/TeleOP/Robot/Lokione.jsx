import React, { Suspense, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Vector3, Quaternion } from 'three'
import { useFrame } from 'react-three-fiber';
import { useBox, useCylinder, useRaycastVehicle } from '@react-three/cannon';

import { useWheels } from './useWheels';
import { useControls } from './useControls';
import { WheelDebug } from './WheelDebug';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Lokione(props) {

  const { nodes, materials } = useGLTF("/robotNou.gltf");


  const position = [22.5, 0, 38];
  const width = 6;
  const height = 2; //.84
  const front = 2.8;
  const wheelRadius = 1.1;

  const [bratPosition, setBratPosition] = useState(0);
  const [bratApuca, setBratApuca] = useState(true);
  const bratIncrease = 0.2;

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


  const bratBodyArgs = [chassisBodyArgs[0], chassisBodyArgs[1], chassisBodyArgs[2] - 10];
  const [bratBody, bratAPI] = useCylinder(
    () => ({
      args: [0.5, 0.5, 30, 32],
      position: [0, 0, 0],
      type: 'Static'
    }),
    useRef(null)
  )

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
    if (controls.f)
      setBratApuca(!bratApuca);

    if (controls.shift)
      if (bratPosition <= 10)
        setBratPosition(bratPosition + bratIncrease);

    if (controls.control)
      if (bratPosition >= -10)
        setBratPosition(bratPosition - bratIncrease);

    bratAPI.position.set(0, bratPosition, -10);


    if (bratApuca) {
      bratAPI.position.set(10000, bratPosition, 100000);
    } else {
      bratAPI.position.set(0, bratPosition, -10);
    }

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


  useFrame((state) => {
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

  });

  return (
    <Suspense callback={null}>
      <group {...props} dispose={null} ref={vehicle} name="vehicle">
        <group>
          <WheelDebug wheelRef={wheels[0]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[1]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[2]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[3]} wheelRadius={wheelRadius} />
        </group>
        <group ref={chassisBody}>
          <group ref={bratBody}>
            <mesh position={[0, 0, 0]}>
              <cylinderBufferGeometry args={[0.5, 0.5, 30, 32]} attach={"geometry"} />
              <meshPhongMaterial color={"#2f2f2f"} attach={"material"} />
            </mesh>
          </group>
          {/* <mesh position={[0, 0, 0]}> */}
          <mesh ref={chassisBody}>
            <boxGeometry args={[6, 1.5, 6]} />
            <meshPhongMaterial attach={"material"} color="#FFFF00" transparent opacity={0} />
          </mesh>
          <WheelDebug wheelRef={wheels[0]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[1]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[2]} wheelRadius={wheelRadius} />
          <WheelDebug wheelRef={wheels[3]} wheelRadius={wheelRadius} />
          <group scale={[0.3, 0.3, 0.3]} ref={chassisBody} name="chassisBody">
            <group rotation={[0, Math.PI, 0]} position={[-1.5, -8, 3]}>

              <group name="Scene">
                <mesh
                  name="REV-31-1153_v1"
                  castShadow
                  receiveShadow
                  geometry={nodes["REV-31-1153_v1"].geometry}
                  material={materials["Material.003"]}
                  position={[-9.1158, 13.85, -5.0322]}
                  rotation={[-Math.PI, -1.5705, 0]}
                  scale={0.0625}
                />
                <mesh
                  name="suport_baterie"
                  castShadow
                  receiveShadow
                  geometry={nodes.suport_baterie.geometry}
                  material={materials.verde}
                  position={[-8.3147, 9.9961, 8.5526]}
                  rotation={[0, -1.5705, 0]}
                  scale={0.0625}
                />
                <mesh
                  name="REV-31-1153_v1001"
                  castShadow
                  receiveShadow
                  geometry={nodes["REV-31-1153_v1001"].geometry}
                  material={materials["Material.003"]}
                  position={[-9.1158, 13.85, 1.477]}
                  rotation={[0, 1.5705, 0]}
                  scale={-0.0625}
                />
                <mesh
                  name="baterie"
                  castShadow
                  receiveShadow
                  geometry={nodes.baterie.geometry}
                  material={materials["Material.003"]}
                  position={[-8.3573, 10.7818, 8.2031]}
                  rotation={[0, 1.5705, 0]}
                  scale={0.0625}
                />
                <mesh
                  name="Plane"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane.geometry}
                  material={materials["Material.007"]}
                  position={[-11.2669, 16.1888, -0.0093]}
                  rotation={[0, 0, Math.PI / 2]}
                  scale={[6.2358, 5.9376, 11.7025]}
                />
                <mesh
                  name="Plane001"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane001.geometry}
                  material={materials["Material.007"]}
                  position={[8.0034, 16.1888, -0.0093]}
                  rotation={[0, 0, Math.PI / 2]}
                  scale={[6.2358, 5.9376, 11.7025]}
                />
                <mesh
                  name="FR"
                  castShadow
                  receiveShadow
                  geometry={nodes.FR.geometry}
                  material={materials["negru roti"]}
                  position={[-11.1404, 7.8259, 11.3915]}
                  rotation={[-Math.PI, 0, -Math.PI / 2]}
                  scale={-0.0625}
                />
                <mesh
                  name="RRcover"
                  castShadow
                  receiveShadow
                  geometry={nodes.RRcover.geometry}
                  material={materials["galben "]}
                  position={[-11.7827, 7.7845, -6.3223]}
                  rotation={[Math.PI, 0, Math.PI / 2]}
                  scale={0.0625}
                />
                <mesh
                  name="FL"
                  castShadow
                  receiveShadow
                  geometry={nodes.FL.geometry}
                  material={materials["negru roti"]}
                  position={[7.375, 7.8259, 11.3915]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={0.0625}
                />
                <mesh
                  name="Plane023"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane023.geometry}
                  material={materials["Material.003"]}
                  position={[-1.8587, 7.8688, -7.6388]}
                  scale={0.0625}
                />
                <mesh
                  name="FLcover"
                  castShadow
                  receiveShadow
                  geometry={nodes.FLcover.geometry}
                  material={materials["galben "]}
                  position={[8.0174, 7.7845, 11.3628]}
                  rotation={[0, 0, -Math.PI / 2]}
                  scale={0.0625}
                />
                <mesh
                  name="channel_baterie"
                  castShadow
                  receiveShadow
                  geometry={nodes.channel_baterie.geometry}
                  material={materials["Material.001"]}
                  position={[-10.0234, 14.6142, -0.8921]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                  scale={0.0625}
                />
                <mesh
                  name="RR"
                  castShadow
                  receiveShadow
                  geometry={nodes.RR.geometry}
                  material={materials["negru roti"]}
                  position={[-11.1404, 7.8259, -6.351]}
                  rotation={[Math.PI, 0, Math.PI / 2]}
                  scale={0.0625}
                />
                <mesh
                  name="Circle002"
                  castShadow
                  receiveShadow
                  geometry={nodes.Circle002.geometry}
                  material={materials["Material.001"]}
                  position={[-1.4932, 12.6961, 9.8716]}
                  scale={0.0389}
                />
                <mesh
                  name="Circle003"
                  castShadow
                  receiveShadow
                  geometry={nodes.Circle003.geometry}
                  material={materials["Material.001"]}
                  position={[-3.5809, 12.6961, 9.8125]}
                  rotation={[-Math.PI, 0, 0]}
                  scale={-0.0391}
                />
                <mesh
                  name="Circle004"
                  castShadow
                  receiveShadow
                  geometry={nodes.Circle004.geometry}
                  material={materials["Material.001"]}
                  position={[-1.4932, 12.1103, 9.8716]}
                  scale={0.0389}
                />
                <mesh
                  name="Circle005"
                  castShadow
                  receiveShadow
                  geometry={nodes.Circle005.geometry}
                  material={materials["Material.001"]}
                  position={[-3.5809, 12.1103, 9.8125]}
                  rotation={[-Math.PI, 0, 0]}
                  scale={-0.0391}
                />
                <mesh
                  name="gheara-noua-1-1"
                  castShadow
                  receiveShadow
                  geometry={nodes["gheara-noua-1-1"].geometry}
                  material={materials["Material.005"]}
                  position={[-4.2227, 12.4076, 11.362]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.0415}
                />
                <mesh
                  name="gheara-noua-1-1001"
                  castShadow
                  receiveShadow
                  geometry={nodes["gheara-noua-1-1001"].geometry}
                  material={materials["Material.005"]}
                  position={[-0.8849, 12.4076, 11.455]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                  scale={0.0415}
                />
                <mesh
                  name="gheara-noua-1-1002"
                  castShadow
                  receiveShadow
                  geometry={nodes["gheara-noua-1-1002"].geometry}
                  material={materials["Material.005"]}
                  position={[-4.2227, 11.8418, 11.362]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.0415}
                />
                <mesh
                  name="FRcover"
                  castShadow
                  receiveShadow
                  geometry={nodes.FRcover.geometry}
                  material={materials["galben "]}
                  position={[-11.7827, 7.7845, 11.3628]}
                  rotation={[-Math.PI, 0, -Math.PI / 2]}
                  scale={-0.0625}
                />
                <mesh
                  name="gheara-noua-1-1003"
                  castShadow
                  receiveShadow
                  geometry={nodes["gheara-noua-1-1003"].geometry}
                  material={materials["Material.005"]}
                  position={[-0.8849, 11.8418, 11.455]}
                  rotation={[Math.PI / 2, 0, Math.PI]}
                  scale={0.0415}
                />
                <mesh
                  name="Gheara-sup"
                  castShadow
                  receiveShadow
                  geometry={nodes["Gheara-sup"].geometry}
                  material={materials["Material.005"]}
                  position={[-2.5204, 15.0796, 4.4266]}
                  rotation={[0, -Math.PI / 2, 0]}
                  scale={0.0597}
                />
                <mesh
                  name="Prindere-gh-de-gls"
                  castShadow
                  receiveShadow
                  geometry={nodes["Prindere-gh-de-gls"].geometry}
                  material={materials["Material.005"]}
                  position={[-1.409, 16.2438, -3.4191]}
                  scale={0.0601}
                />
                <mesh
                  name="RLcover"
                  castShadow
                  receiveShadow
                  geometry={nodes.RLcover.geometry}
                  material={materials["galben "]}
                  position={[8.048, 7.7845, -6.3223]}
                  rotation={[0, 0, Math.PI / 2]}
                  scale={-0.0625}
                />
                <mesh
                  name="MotorMosor"
                  castShadow
                  receiveShadow
                  geometry={nodes.MotorMosor.geometry}
                  material={materials["Material.002"]}
                  position={[4.587, 13.5753, 0.0554]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.0625}
                />
                <mesh
                  name="Circle055"
                  castShadow
                  receiveShadow
                  geometry={nodes.Circle055.geometry}
                  material={materials.verde}
                  position={[4.4994, 13.6298, -4.6579]}
                  scale={0.0625}
                />
                <mesh
                  name="glisiera"
                  castShadow
                  receiveShadow
                  geometry={nodes.glisiera.geometry}
                  material={materials["Material.001"]}
                  position={[4.6204, 22.2846, -6.3586]}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                  scale={[0.0625, 0.0625, 0.3743]}
                />
                <mesh
                  name="glisiera001"
                  castShadow
                  receiveShadow
                  geometry={nodes.glisiera001.geometry}
                  material={materials["Material.001"]}
                  position={[3.0456, 22.2846, -6.3586]}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                  scale={[0.0625, 0.0625, 0.3743]}
                />
                <mesh
                  name="glisiera002"
                  castShadow
                  receiveShadow
                  geometry={nodes.glisiera002.geometry}
                  material={materials["Material.001"]}
                  position={[1.4742, 22.2846, -6.3586]}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                  scale={[0.0625, 0.0625, 0.3743]}
                />
                <mesh
                  name="RL"
                  castShadow
                  receiveShadow
                  geometry={nodes.RL.geometry}
                  material={materials["negru roti"]}
                  position={[7.4056, 7.8259, -6.351]}
                  rotation={[0, 0, Math.PI / 2]}
                  scale={-0.0625}
                />
                <mesh
                  name="glisiera003"
                  castShadow
                  receiveShadow
                  geometry={nodes.glisiera003.geometry}
                  material={materials["Material.001"]}
                  position={[-0.1079, 22.2846, -6.3586]}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                  scale={[0.0625, 0.0625, 0.3743]}
                />
                <mesh
                  name="Plane045"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane045.geometry}
                  material={materials.negru}
                  position={[4.5807, 35.3004, -5.8573]}
                  rotation={[0, -1.5705, 0]}
                  scale={0.0625}
                />
                <mesh
                  name="Plane047"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane047.geometry}
                  material={materials.negru}
                  position={[2.9919, 35.3004, -5.8573]}
                  rotation={[0, -1.5705, 0]}
                  scale={0.0625}
                />
                <mesh
                  name="Plane049"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plane049.geometry}
                  material={materials.negru}
                  position={[1.4303, 35.3004, -5.8573]}
                  rotation={[0, -1.5705, 0]}
                  scale={0.0625}
                />
                <mesh
                  name="profil_6_gauri001"
                  castShadow
                  receiveShadow
                  geometry={nodes.profil_6_gauri001.geometry}
                  material={materials["Material.001"]}
                  position={[-1.9392, 8.2874, 1.184]}
                  rotation={[0, 1.5705, 0]}
                  scale={0.0625}
                />
                <mesh
                  name="profil_6_gauri002"
                  castShadow
                  receiveShadow
                  geometry={nodes.profil_6_gauri002.geometry}
                  material={materials["Material.001"]}
                  position={[4.5542, 11.2938, -0.2233]}
                  scale={0.0625}
                />
                <mesh
                  name="profil_13_gauri"
                  castShadow
                  receiveShadow
                  geometry={nodes.profil_13_gauri.geometry}
                  material={materials["Material.001"]}
                  position={[4.5567, 8.287, 2.6192]}
                  scale={0.0625}
                />
                <mesh
                  name="profil_13_gauri001"
                  castShadow
                  receiveShadow
                  geometry={nodes.profil_13_gauri001.geometry}
                  material={materials["Material.001"]}
                  position={[-8.2926, 8.287, 2.6192]}
                  scale={0.0625}
                />
              </group>

            </group>
          </group>
        </group>
      </group>
    </Suspense>
  )
}

// useGLTF.preload('/robotNou.gltf');
// useGLTF.preload("/robotNou.glb");
