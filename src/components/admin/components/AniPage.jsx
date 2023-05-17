import React, { useEffect, useState } from "react";
import Firestore from "../../utils/Firestore";
import Placeholder from "../../utils/Placeholder";

const firestore = new Firestore();

function AniPage({ anii }) {
  const [clasa3, setClasa3] = useState("fas fa-caret-right");
  const [h3, setH3] = useState("0");

  function more3() {
    if (clasa3 === "fas fa-caret-up") {
      setClasa3("fas fa-caret-right");
      setH3("0");
    } else {
      setClasa3("fas fa-caret-up");
      setH3("auto");
    }
  }
  const [ani_efectiv, setAniEfectiv] = useState("");
  const [dd, setdd] = useState("");

  const [ani, setAnis] = useState([]);

  useEffect(() => {
    setAnis((old) => (old = anii));
  }, [anii]);

  const add_ani = async () => {
    let added = {
      ani: ani_efectiv,
      createAt: dd === "" ? Placeholder.getdateadmin() : dd,
    };
    await firestore
      .addItem("ani", added)
      .then(async (res) => {
        alert("ani adaugata");
        setdd("");
        setAnis(old=>[res, ...old,])
      })
      .catch((err) => alert(err));
  };
  const delete_year = async (e) => {
    await firestore.deleteDocument("ani", e).then((res) => {
      alert("sters cu succes");
      setAnis((old) => (old = old.filter((o) => o.id != e)));
    });
  };
  return (
    <div className="adminpage">
      <div className="ani_part">
        <div className="form">
          <h1>FOR ANI</h1>
          <h4>Anul se va scrie in formatul an-an, ex: 2021-2022</h4>{" "}
          <input
            placeholder="adauga anul curent"
            type="text"
            onChange={(e) => setAniEfectiv(e.target.value)}
          />
          <input
            type="date"
            defaultValue={dd}
            onChange={(e) => setdd(e.target.value)}
          />
          <button className="button" type="submit" onClick={add_ani}>
            submit
          </button>
        </div>

        <div className="stemText">
          <div className="more">
            <div className="press" onClick={more3}>
              <i className={clasa3}></i>
              <span id="STEM">
                Arată toti anii {"("}
                {ani && ani.length}
                {")"}
              </span>
            </div>
            <div
              className="hide"
              style={{ height: h3, transition: "0.5s ease-in-out" }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                {ani &&
                  ani.map((an) => {
                    return (
                      <>
                        <div
                          style={{
                            width: "max-content",
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            padding: "20px 30px",
                          }}
                        >
                          <div className="div">
                            <h1 style={{ color: "white" }}>{an.ani}</h1>
                            <small style={{ color: "white" }}>
                              {an.createAt}
                            </small>
                          </div>
                          <button
                            className="button"
                            onClick={() => delete_year(an.id)}
                          >
                            delete year
                          </button>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AniPage;
