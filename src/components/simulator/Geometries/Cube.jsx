import React from "react";

import { TextureLoader } from "three";
import { useLoader } from "react-three-fiber";
import Textura from './user.jpg';

function Cube() {

    const colorMap = useLoader(TextureLoader, Textura);

    return (
        <mesh rotation={[90, 0, 45]}>
            <boxBufferGeometry attach={"geometry"} args={[3, 3, 3]}></boxBufferGeometry>
            <meshStandardMaterial map={colorMap} />
        </mesh>
    );
}

export default Cube;