import { useBox } from "@react-three/cannon";
import { useLoader } from "react-three-fiber";
import { TextureLoader } from "three";
import { useRef } from "react";

import PereteTextura from "./perete.jpg";

const debug = true;

export function PereteBox({ position, scale, ceva }) {

    var pose = [position[0], position[1] + scale[1] / 2, position[2]];

    var aux;

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

    // console.log(ceva)

    return (
        debug && (
            <>
                <group ref={pereteBody}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={scale} attach={"geometry"} />
                        {/* <meshStandardMaterial map={pereteTexture} attach={"material"} /> */}
                        <meshBasicMaterial attach={"material"} color="#ffffff" transparent opacity={0.6} />
                    </mesh>
                    {ceva === "frontal" ? <>
                        <mesh position={[scale[0] / 2, 0, 0]}>
                            <boxGeometry args={
                                ceva === "frontal" ? [scale[0] / 60, scale[1], scale[2] + 0.2]
                                    : [scale[2] / 70, scale[1], scale[0]]
                            } />
                            <meshBasicMaterial attach={"material"} color="#000000" />
                        </mesh>
                        <mesh position={[-scale[0] / 2, 0, 0]}>
                            <boxGeometry args={
                                ceva === "frontal" ? [scale[0] / 60, scale[1], scale[2]]
                                    : [scale[2] / 70, scale[1], scale[0]]
                            } />
                            <meshBasicMaterial attach={"material"} color="#000000" />
                        </mesh>
                    </> : null
                    }
                    {ceva === "frontal" ? <>
                        <mesh position={[0, position[1], 0]}>
                            <boxGeometry args={[scale[0] + 0.2, scale[1] / 10, scale[2] + 0.2]} />
                            <meshBasicMaterial attach={"material"} color="#000000" />
                        </mesh>
                        <mesh position={[0, -position[1], 0]}>
                            <boxGeometry args={[scale[0] + 0.2, scale[1] / 10, scale[2] + 0.2]} />
                            <meshBasicMaterial attach={"material"} color="#000000" />
                        </mesh>
                    </> :
                        <>
                            <mesh position={[0, position[1], 0]} rotation={[0, Math.PI / 2, 0]}>
                                <boxGeometry args={[scale[2] + 0.2, scale[1] / 10, scale[0] + 0.2]} />
                                <meshBasicMaterial attach={"material"} color="#000000" />
                            </mesh>
                            <mesh position={[0, -position[1], 0]} rotation={[0, Math.PI / 2, 0]}>
                                <boxGeometry args={[scale[2] + 0.2, scale[1] / 10, scale[0] + 0.2]} />
                                <meshBasicMaterial attach={"material"} color="#000000" />
                            </mesh>
                        </>
                    }
                </group>
            </>
        )
    );
}