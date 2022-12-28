import React from "react";
import './Overlay.css';

function Overlay() {


    return (
        <div className="wrapper">
            <div class="controls">
                <div>Folosește W A S D pentru a te mișca</div>
                <div>Dacă terenul sau robotul functionează ciudat</div>
                <div>Apasă R pentru a reseta fiecare componentă</div>
                {/* press k to swap camera<br /> */}
                {/* Teren stricat sau robot ce se misca ciudat?<br />
            Apasa R pentru a reseta. */}
            </div>
        </div>
    );

}

export default Overlay;