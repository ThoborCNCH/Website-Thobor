import React from "react";
import { v1 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const CreateRoom = (props) => {
  let navigate = useNavigate();

  function create() {
    const id = uuid();

    navigate(`/admin/meet/m/${id}`);
  }

  return (
    <>
      <div
        className="adminpage"
        style={{ width: "calc(100vw - 226px)", padding: 0, margin: 0 }}
      >
        <div
          className="shop_part"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            margin: "40px 0",
          }}
        >
          <button
            style={{
              border: "2px solid black",
              width: "fit-content",
              padding: "5px",
              borderRadius: "5px",
              fontSize: "18px",
            }}
            onClick={create}
          >
            Creaza camera
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
