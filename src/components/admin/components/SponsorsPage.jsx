import React from "react";
import Firestore from "../../utils/Firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firestore = new Firestore();

function SponsorsPage() {
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [logo, setlogo] = useState();
  const [loadingglogo, setloadingglogo] = useState(false);
  const [spon_img, setspon_img] = useState("");
  const [spon, setSponsori] = useState([]);

  const getSponsori = async () => {
    await firestore.readDocuments("sponsors").then((res) => {
      setSponsori(res);
    });
  };

  useEffect(() => {
    getSponsori();
  }, []);
  const upload_sponsor = async () => {
    const { uid } = user;

    let added = {
      uid,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    setloadingglogo(true);
    const storage = getStorage();

    const storageRef = ref(storage, `sponsors/${logo.name}`);
    try {
      await uploadBytes(storageRef, logo);
      const url = await getDownloadURL(storageRef);
      added.logo = url;
    } catch (error) {
      console.error(error);
    }

    console.log(added);
    await firestore
      .addItem("sponsors", added)
      .then(async (res) => {
        alert("sponsor adaugat");
        setloadingglogo(false);
        await getSponsori();
      })

      .catch((err) => alert(err));
  };

  const delete_sponsor = async (e) => {
    await firestore
      .deleteDocument("sponsors", e)
      .then(async (res) => {
        alert("sters cu succes");
        await getSponsori();
      })
      .catch(function (error) {
        alert(error);
        return;
      });
  };
  const [clasa6, setClasa6] = useState("fas fa-caret-right");
  const [h6, setH6] = useState("0");

  function more6() {
    if (clasa6 === "fas fa-caret-up") {
      setClasa6("fas fa-caret-right");
      setH6("0");
    } else {
      setClasa6("fas fa-caret-up");
      setH6("auto");
    }
  }
  return (
    <div className="adminpage">
      <div className="sponsor_part">
        <div className="form">
          <h1>FOR SPONSORS</h1>
          <h4>Logo-ul sponsorului</h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setlogo(e.target.files[0]);
            }}
          />
          <button
            type="submit"
            onClick={upload_sponsor}
            className="button"
            disabled={loadingglogo ? true : false}
          >
            {loadingglogo ? "loadingg" : "add sponsor"}
          </button>
        </div>
        <div className="stemText">
          <div className="more">
            <div className="press" onClick={more6}>
              <i className={clasa6}></i>
              <span id="STEM">
                Arată toti sponsorii{"("}
                {spon && spon.length}
                {")"}
              </span>
            </div>
            <div
              className="hide"
              style={{ height: h6, transition: "0.5s ease-in-out" }}
            >
              <div className="sponsors" style={{ width: "100%" }}>
                {spon &&
                  spon.map((sp) => (
                    <div>
                      <img src={sp.logo} />
                      <button
                        className="button"
                        onClick={() => delete_sponsor(sp.id)}
                      >
                        delete this sponsor
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SponsorsPage;
