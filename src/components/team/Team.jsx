import React, { useEffect } from "react";
import Generatie from "../alumni/components/Generatie";
import Contact from "../utils/Contact";
import Up from "../utils/Up";
import AOS from "aos";
import "aos/dist/aos.css";
import Persoana from "../alumni/components/AlumniPersoana";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";
import Firestore from "../utils/Firestore";

const firestore = new Firestore();

function Team() {
  const [ani, setAni] = useState([]);
  const [team, setTeam] = useState([]);
  const getAni = async () => {
    await firestore.sortdata("ani", "createAt", "desc").then(async (res) => {
      setAni(res);
      await firestore.readDocuments("team_member").then((res) => {
        setTeam(res);
      });
    });
  };

  useEffect(() => {
    getAni();
    AOS.init();
  }, []);

  return (
    <div style={{ background: "#2f2f2f" }}>
      <img
        src={require("../../img/team_banner.svg").default}
        alt=""
        className="header"
      />
      {ani &&
        ani.map((ani) => (
          <Generatie
            no={false}
            years={ani.ani}
            team={false}
            key={ani.id}
            persoane={[
              team &&
                team.filter((te) => {
                  if (te.ani == ani.ani)
                    return {
                      key: te.id,
                      no: false,
                      img: te.poza,
                      nume: te.nume,
                      faculta: te.detalii,
                    };
                }),
            ]}
          />
        ))}

      <Contact />
      <Up />
    </div>
  );
}

export default Team;
