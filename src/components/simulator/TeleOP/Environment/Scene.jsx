import { Environment, OrbitControls } from "@react-three/drei";
import React, { Suspense } from "react";
import { PerspectiveCamera } from "@react-three/drei";

function Scene() {

    return (
        <Suspense fallback={null}>
            <Environment
                blur={.1}
                // preset={"sunset"}
                background={true}
                files={'./studio_maro.hdr'}
            />
            <ambientLight position={[0, 6, 0]} intensity={.4} />
            <PerspectiveCamera
                makeDefault
                position={[0, 4, 1]}
                fov={70}
            />
            {
                <OrbitControls target={[0, -3.5, -0.5]} zoomSpeed={0.5} />
            }
            {/* <gridHelper args={[100, 100]} /> */}
            {/* <OrbitControls target={[0, 0.15, 0]} zoomSpeed={.7}/> */}
        </Suspense>
    );
}

export default Scene;