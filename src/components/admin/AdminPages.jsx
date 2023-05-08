import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./components/SideNav";
import Firestore from "../utils/Firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./admin.scss";

const firestore = new Firestore();

const ids = process.env.REACT_APP_IDS.split(" ");

function AdminPages() {
  const [user, loading, error] = useAuthState(firestore.getuser());

  const signInWithGoogle = async () => {
    await firestore.signInWithGoogle();
  };
  return (
    <>
      {loading ? (
        <h1>Se incarca </h1>
      ) : user ? (
        ids.includes(user.uid) ? (
          <div className="adminpages">
            <SideNav />
            <Outlet />
          </div>
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
