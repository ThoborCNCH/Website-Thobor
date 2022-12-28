import React, { Suspense, useState } from "react";

import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, OrbitControls } from "@react-three/drei";
import { Stats } from "@react-three/drei";

import Cube from "./Geometries/Cube";
import Sfera from "./Geometries/Sfera";
import Loki from './Geometries/Loki';

import './Componenta.css';


function Componenta() {

    return (
        <div className="wrapper">
            <Canvas className="canvas" camera={{ position: [-5, 3.142, 0] }}>
                <Stats showPanel={2} />
                <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={"4"} />
                <Suspense fallback={<Sfera />} >
                    <Loki />
                </Suspense>
                <ambientLight intensity={.3} />
                <Environment 
                    preset={'sunset'}
                />
                {/* <directionalLight position={[-10, 5, 0]} intensity={0.2} />
                <directionalLight position={[10, 5, 0]} intensity={0.2} />
                <directionalLight position={[0, 15, 0]} intensity={0.5} />
                <directionalLight position={[2, 0, 2]} intensity={0.4} />
                <directionalLight position={[-2, 0, -2]} intensity={0.4} />
                <directionalLight position={[0, 0, -3]} intensity={0.4} />
                <directionalLight position={[0, -1, 0]} intensity={0.4} /> */}
                
                {/* <gridHelper args={[100, 100]} /> */}
            </Canvas>

        </div>
    );
}

export default Componenta;