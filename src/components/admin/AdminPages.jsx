import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import Firestore from "../utils/Firestore";
import "./admin.scss";
import SideNav from "./components/SideNav";

const firestore = new Firestore();

function AdminPages({ emails, isAllowed }) {
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [k, setk] = useState(false);

  useEffect(() => {
    console.log(emails);
    if (emails.length > 0 && user && !loading)
      for (let i = 0; i < emails.length && emails; i++) {
        if (emails[i].email === user.email) {
          setk(true);
          break;
        }
      }
  }, [loading, emails]);

  const signInWithGoogle = async () => {
    await firestore.signInWithGoogle();
  };
  const [link, setLink] = useState("");
  useEffect(() => {
    setLink(window.location.href);
  }, [window.location.href]);

  return (
    <>
      {loading ? (
        <h1>Se incarca </h1>
      ) : user ? (
        k ? (
          !link.includes("meet") ||
          link.includes("create") ||
          link.includes("end") ? (
            <div className="adminpages">
              <SideNav isAllowed={isAllowed} />
              <Outlet />
            </div>
          ) : (
            <Outlet />
          )
        ) : (
          <div className="err">
            <h1>Nu ai acces aici! </h1>
          </div>
        )
      ) : (
        <div className="err">
          <h1>
            Logheaza-te cu contul echipei de robotica <span> Thobor</span>{" "}
            pentru a avea acces la pagina de admin!
          </h1>
          <h2 onClick={signInWithGoogle}>Login</h2>
        </div>
      )}
    </>
  );
}

export default AdminPages;
