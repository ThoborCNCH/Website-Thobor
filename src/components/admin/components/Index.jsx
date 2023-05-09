import React from "react";

function Index() {
  return (
    <div
      className="adminpage"
      style={{ width: "calc(100vw - 226px)", padding: 0, margin: 0 }}
    >
      <div style={{ background: "#2f2f2f" }}>
        <img
          src={require("../../../img/admin.svg").default}
          alt=""
          className="header"
        />
      </div>

      <div
        className="shop_part"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "40px 0",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          Alege o sectiunie pe care sa o administrezi
        </h1>
      </div>
    </div>
  );
}

export default Index;
