import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import Firestore from "../utils/Firestore";
import "./admin.scss";
import SideNav from "./components/SideNav";

const firestore = new Firestore();

function AdminPages({ isAllowed }) {
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [k, setk] = useState(false);

  const getUsers = async () => {
    await firestore.readDocuments("thobor_users").then((res) => {
      if (res.length > 0 && user && !loading)
        for (let i = 0; i < res.length; i++) {
          if (res[i].email === user.email) {
            setk(true);
          }
        }
    });
  };

  useEffect(() => {
    getUsers();
  }, [, user, loading]);

  const signInWithGoogle = async () => {
    await firestore.signInWithGoogle();
  };
  const [link, setLink] = useState("");
  useEffect(() => {
    setLink(window.location.href);
    console.log("link: ", window.location.origin);
  }, [, window.location]);

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
            Logheaza-te cu contul de Google oferit inregistrat de adminul <span> Thobor</span>{" "}
            pentru a avea acces la pagina de admin!
          </h1>
          <h2 onClick={signInWithGoogle}>Login</h2>
        </div>
      )}
    </>
  );
}

export default AdminPages;
