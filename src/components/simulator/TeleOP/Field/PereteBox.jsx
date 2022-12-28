import { useBox } from "@react-three/cannon";
import { useLoader } from "react-three-fiber";
import { TextureLoader } from "three";
import { useRef } from "react";

import PereteTextura from "./perete.jpg";

const debug = true;

export function PereteBox({ position, scale }) {

    var pose = [position[0], position[1] + scale[1] / 2, position[2]];

    const pereteTexture = useLoader(TextureLoader, PereteTextura);
    // pereteTexture.repeat.set(Math.abs(scale[0]), Math.abs(scale[1]));
    // pereteTexture.repeat.set(9,1);

    // useBox(() => ({
    //     args: scale,
    //     position,
    //     type: 'Dynamic',
    //     mass: 10000
    // }));

    const [pereteBody, pereteAPI] = useBox(
        () => ({
            args: scale,
            mass: 0,
            position
        }),
        useRef(null)
    );

    return (
        debug && (
            <>
                <mesh ref={pereteBody}>
                    <boxGeometry args={scale} attach={"geometry"} />
                    <meshStandardMaterial map={pereteTexture} attach={"material"} />
                </mesh>
            </>
        )
    );
}