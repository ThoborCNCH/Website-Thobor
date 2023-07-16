import React from "react";
import { v1 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const CreateRoom = ({ isAllowed }) => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  // let link = window.location.href;

  let navigate = useNavigate();

  function create() {
    const id = uuid();

    openInNewTab(window.location.origin + `/admin/meet/m/${id}`);

    // navigate(`/admin/meet/m/${id}`);
  }

  return (
    <>
      {isAllowed && (
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
      )}
    </>
  );
};

export default CreateRoom;
