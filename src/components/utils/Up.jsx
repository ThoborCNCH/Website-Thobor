import React from "react";

function Up() {
  const scrool= () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }
  return (
    <div onClick={scrool} className="up" data-aos="fade-up">
      <img src={require("../../img/up.svg").default} alt="" />
    </div>
  );
}

export default Up;
