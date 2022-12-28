import { useBox, usePlane } from "@react-three/cannon";
import React, { Suspense, useEffect, useRef } from "react";
import { useLoader } from "react-three-fiber";
import { Texture, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { PereteBox } from "./PereteBox";
import Cone from "./Cone";
import { Junction } from './Junction';

import FieldTexture from './light_field.jpg';
import Ground from "./Ground";

function Field() {

    const [ref] = usePlane(
        () => ({
            type: 'Static',
            rotation: [-Math.PI / 2, 0, 0]
        }),
        useRef(null)
    );

    const textureMap = useLoader(TextureLoader, FieldTexture);
    textureMap.repeat.set(1, 1);

    // const pereteTexture = useLoader(TextureLoader, pereteTexture);

    return (
        <Suspense fallback={null}>
            {/* AICI STACK BLANA DE CONURI TOT CODUL ESTE DEJA PREA TARZIU VREAU SA MOR NU STIU DE CE FAC ASTA
            DAR STIU CA ESTE O ALEGERE PROASTA SALVAT-MA PANA NU
            FAC CEVA CE VOI REGRETA PENTRU TOT RESTUL
            DEJA REGRET DAR NU AM ALTE CUVINTE */}

            <group>
                {/* STACK BLANA DE CONURI THO */}
                {/* <Cone position={[-7.5, 2, 0]} />
                <Cone position={[-7.5, 2, 3]} />
                <Cone position={[-7.5, 2, -3]} /> */}
                <Cone position={[-7.5, 2, -1.6]} />
                <Cone position={[-7.5, 2, 1.6]} />
                {/* <Cone position={[-7.8, 5.1, 0]} /> */}
            </group>

            {/* <group >
                <Cone position={[-2 + 7.5, 2, 0]} />
                <Cone position={[2 + 7.5, 2, 0]} />
             </group> */}

            <Cone position={[30 - 15 / 2, 2, 30 - 15 / 2]} />
            <Cone position={[30 - 15 / 2, 2, -(30 - 15 / 2)]} />
            <Cone position={[-(30 - 15 / 2), 2, 30 - 15 / 2]} />
            <Cone position={[-(30 - 15 / 2), 2, -(30 - 15 / 2)]} />

            <Ground position={[0, 0, 0]} />
            <Ground position={[30, 0, 0]} />
            <Ground position={[-30, 0, 0]} />
            <Ground position={[0, 0, 30]} />
            <Ground position={[0, 0, -30]} />
            <Ground position={[30, 0, 30]} />
            <Ground position={[30, 0, -30]} />
            <Ground position={[-30, 0, 30]} />
            <Ground position={[-30, 0, -30]} />

            <Junction height={30} position={[15, 0, 0]} planeRef={ref} />
            <Junction height={30} position={[-15, 0, 0]} planeRef={ref} />
            <Junction height={30} position={[0, 0, 15]} planeRef={ref} />
            <Junction height={30} position={[0, 0, -15]} planeRef={ref} />

            <Junction height={20} position={[15, 0, 15]} planeRef={ref} />
            <Junction height={20} position={[15, 0, -15]} planeRef={ref} />
            <Junction height={20} position={[-15, 0, 15]} planeRef={ref} />
            <Junction height={20} position={[-15, 0, -15]} planeRef={ref} />

            <Junction height={10} position={[-15 * 2, 0, 15]} planeRef={ref} />
            <Junction height={10} position={[-15, 0, 15 * 2]} planeRef={ref} />
            <Junction height={10} position={[15 * 2, 0, 15]} planeRef={ref} />
            <Junction height={10} position={[15, 0, 15 * 2]} planeRef={ref} />

            <Junction height={10} position={[15 * 2, 0, -15]} planeRef={ref} />
            <Junction height={10} position={[15, 0, -15 * 2]} planeRef={ref} />
            <Junction height={10} position={[-15 * 2, 0, -15]} planeRef={ref} />
            <Junction height={10} position={[-15, 0, -15 * 2]} planeRef={ref} />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.2, 0, 0.2]}>
                <planeGeometry attach="geometry" args={[90, 90]} />
                {/* 0xf57af5 */}
                {/* <meshPhongMaterial attach={"material"} color={0x000000} /> */}
                <meshBasicMaterial attach={"material"} map={textureMap} />
            </mesh>

            <PereteBox position={[45, 3.8, 0]} scale={[1, 7.6, 91]} />
            <PereteBox position={[-45, 3.8, 0]} scale={[1, 7.6, 91]} />
            <PereteBox position={[0, 3.8, 45]} scale={[91, 7.6, 1]} />
            <PereteBox position={[0, 3.8, -45]} scale={[91, 7.6, 1]} />
        </Suspense>
    );
}

export default Field