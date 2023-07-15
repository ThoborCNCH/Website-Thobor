import React from "react";
import "./style.css";

function EndMeet() {
  return (
    <>
      <div className="adminpage"
      style={{
        height: "calc(100vh - 286.7px)",
        minHeight:"0"
      }}>
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 286.7px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color:"#26b33e"
          }}
        >
          <h1>Sedinta e gata!</h1>
        </div>
      </div>
    </>
  );
}

export default EndMeet;
