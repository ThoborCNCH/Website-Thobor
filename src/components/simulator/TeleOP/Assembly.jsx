import { Physics } from "@react-three/cannon";
import React from "react";
import { Canvas } from "react-three-fiber";
import Overlay from "../Overlay";
import "../canvas.scss";
import Scena from "./Scena";

function Assembly() {
    return (
            <>
        <Canvas className="canvas">
            <Physics
                broadphase={'SAP'}
                gravity={[0, -40, 0]}
            >
                <Scena />
            </Physics>
        </Canvas>
        <Overlay />
        </>
    );
}

export default Assembly;