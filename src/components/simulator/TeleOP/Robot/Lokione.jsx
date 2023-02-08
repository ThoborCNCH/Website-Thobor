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
import { Vec3 } from 'cannon-es';

export default function Lokione(props) {
  
  // const { nodes, materials } = useGLTF("/robotNou.gltf");
  const {nodes, materials} = useGLTF("/robotNou.glb");
  

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
          {/* <group ref={bratBody}>
            <mesh position={[0, 0, 0]}>
              <cylinderBufferGeometry args={[0.5, 0.5, 30, 32]} attach={"geometry"} />
              <meshPhongMaterial color={"#2f2f2f"} attach={"material"} />
            </mesh>
          </group> */}
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
                <mesh
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
                />
                <mesh
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
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["Gheara-sup"].geometry}
                  material={materials["Material.005"]}
                  position={[-2.52, 15.08, 4.43]}
                  rotation={[0, -Math.PI / 2, 0]}
                  scale={0.06}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes["Prindere-gh-de-gls"].geometry}
                  material={materials["Material.005"]}
                  position={[-1.41, 16.24, -3.42]}
                  scale={0.06}
                />
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
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.glisiera003.geometry}
                  material={materials["Material.001"]}
                  position={[-0.11, 22.28, -6.36]}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                  scale={[0.06, 0.06, 0.37]}
                />
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
