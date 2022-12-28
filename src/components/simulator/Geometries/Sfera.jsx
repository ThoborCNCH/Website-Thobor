import React from "react";

import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useLoader } from "react-three-fiber";
import { TextureLoader } from "three";

import Textura from './user.jpg';

function Sfera() {

    const texturaMap = useLoader(TextureLoader, Textura);

    return (
        <>
            <Sphere visible args={[1, 100, 200]} scale={2} >
                <MeshDistortMaterial 
                    distort={0.7} 
                    roughness={10}
                    color="#8352FD"
                />
            </Sphere>
            <meshStandardMaterial map={texturaMap} />
        </>
    );
}

export default Sfera;