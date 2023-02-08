import React from "react";
import './Overlay.css';

function Overlay() {


    return (
        <div className="wrapper">
            <div class="controls">
                <div>CONTROL: W A S D</div>
                <div>STRAFES: Q și E</div>
                <div>ROTIREA: SĂGEȚI</div>
                {/* press k to swap camera<br /> */}
                {/* Teren stricat sau robot ce se misca ciudat?<br />
            Apasa R pentru a reseta. */}
            </div>
        </div>
    );

}

export default Overlay;