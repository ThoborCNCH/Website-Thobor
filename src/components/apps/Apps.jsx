import "./apps.scss";
import React from "react";
import App from "./components/App";
import Up from "../utils/Up";

function Apps({ apps }) {
  return (
    <>
      <div className="apps">
        {apps && apps.map((app) => (
          <App name={app.name} image={app.image} adress={app.adress}/>
        ))}
      </div>
      <Up />
    </>
  );
}

export default Apps;
