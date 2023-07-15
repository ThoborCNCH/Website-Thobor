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
      <div className="adminpages">
        <div
          className="adminpage"
          style={{
            height: "calc(100vh - 286.7px)",
            minHeight: "0",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "calc(100vh - 286.7px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button className="button" onClick={create}>
              Creaza camera
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
