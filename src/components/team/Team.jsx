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

firebase.initializeApp({
  apiKey: "AIzaSyC9bA5NKsStcYRPDDTJFQbFUI1oCX2tq4I",
  authDomain: "thobor-9436b.firebaseapp.com",
  projectId: "thobor-9436b",
  storageBucket: "thobor-9436b.appspot.com",
  messagingSenderId: "496274391107",
  appId: "1:496274391107:web:f1711686e690bab69fd4f6",
});

const firestore = firebase.firestore();

function Team() {
  const teamRef = firestore.collection("team_member");
  const aniRef = firestore.collection("ani");

  const query_team = teamRef.orderBy("createAt", "desc");
  const query_ani = aniRef.orderBy("createAt", "desc");

  const [team] = useCollectionData(query_team, { idField: "id" });
  const [ani] = useCollectionData(query_ani, { idField: "id" });

  useEffect(() => {
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
