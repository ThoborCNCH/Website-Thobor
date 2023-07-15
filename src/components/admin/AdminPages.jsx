import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import Firestore from "../utils/Firestore";
import "./admin.scss";
import SideNav from "./components/SideNav";

const firestore = new Firestore();

function AdminPages({ emails }) {
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [k, setk] = useState(false);

  useEffect(() => {
    if (emails.length > 0 && user && !loading)
      for (let i = 0; i < emails.length && emails; i++) {
        if (emails[i].email === user.email) {
          setk(true);
          break;
        }
      }
  }, [emails]);

  const signInWithGoogle = async () => {
    await firestore.signInWithGoogle();
  };
  return (
    <>
      {loading ? (
        <h1>Se incarca </h1>
      ) : user ? (
        k ? (
          !window.location.href.includes("meet") ||
          window.location.href.includes("create") ||
          window.location.href.includes("end") ? (
            <div className="adminpages">
              <SideNav />
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
