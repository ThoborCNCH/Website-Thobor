import React from "react";

function Index() {
  return (
    <div className="adminpage">
      <div
        className="shop_part"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "-70px 0",
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
