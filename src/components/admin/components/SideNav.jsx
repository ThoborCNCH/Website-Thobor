import React from "react";
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="sidenav">
      <Link to={"blog"}>Blog</Link>
    </div>
  );
}

export default SideNav;
