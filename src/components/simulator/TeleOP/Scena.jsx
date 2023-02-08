import React, { Suspense } from "react";
import Scene from "./Environment/Scene";
import Field from "./Field/Field";
import { Stats } from "@react-three/drei";
import Lokione from "./Robot/Lokione";

function Scena() {

    const thirdPerson = true;

    // useEffect(() => {
    //     function keydownHandler(e) {
    //         if (e.key === "k") {
    //             // random is necessary to trigger a state change
    //             // if (thirdPerson) setCameraPosition([2, 3.9, 2 + Math.random() * 0.01]);
    //             setPerson(!thirdPerson);
    //             console.log(thirdPerson)
    //         }
    //     }

    //     window.addEventListener("keydown", keydownHandler);
    //     return () => window.removeEventListener("keydown", keydownHandler);
    // }, [thirdPerson]);

    return (
        // <div className="wrapper">
        // <Canvas className="canvas">
        <Suspense fallback={null}>
            <Stats showPanel={2} />
            {/* <Physics
                    gravity={[0, -9.8, 0]}
                    broadphase="SAP"
                > */}
            <Field />
            <Scene thirdPerson={thirdPerson}/>
            {/* <Loki /> */}
            <Lokione />
        </Suspense>
        /* </Physics> */
        /* </Canvas> */
    );
}

export default Scena;