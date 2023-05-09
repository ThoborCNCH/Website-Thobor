import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ScrollContainer from "react-indiana-drag-scroll";
import Card from "../../home/components/Card";
import Firestore from "../../utils/Firestore";

const firestore = new Firestore();

function PremiiPage() {
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [img_premii, setImgPremii] = useState();
  const [text_premii, setTextPremii] = useState("");
  const [an_premii, setPremiian] = useState("");
  const [premii, setPremii] = useState([]);
  const [loadingpremii, setloadingpremii] = useState(false);

  const getPremii = async () => {
    await firestore.sortdata("premii", "an", "asc").then((res) => {
      setPremii(res);
    });
  };

  useEffect(() => {
    getPremii();
  }, []);
  const upload_premii = async (e) => {
    e.preventDefault();
    const { uid } = user;
    setloadingpremii(true);
    let added = {
      uid,
      an: Number(an_premii),
      text: text_premii,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const storage = getStorage();

    const storageRef = ref(storage, `premii/${img_premii.name}`);
    try {
      await uploadBytes(storageRef, img_premii);
      const url = await getDownloadURL(storageRef);
      added.img = url;
    } catch (error) {
      alert(error)
    }

    await firestore
      .addItem("premii", added)
      .then(async (res) => {
        alert("premiu adaugat");
        await getPremii();
      })
      .catch((err) => alert(err));
    setloadingpremii(false);
  };

  const delete_premiu = async (e) => {
    await firestore.deleteDocument("premii", e).then(async (res) => {
      alert("sters cu succes");
      await getPremii();
    });
  };
  const [clasa7, setClasa7] = useState("fas fa-caret-right");
  const [h7, setH7] = useState("0");

  function more7() {
    if (clasa7 === "fas fa-caret-up") {
      setClasa7("fas fa-caret-right");
      setH7("0");
    } else {
      setClasa7("fas fa-caret-up");
      setH7("auto");
    }
  }
  return (
    <div className="adminpage">
      <div className="premii_part">
        <div className="form">
          <div className="form">
            <h1>FOR PREMII</h1>
            <h4>Poza principala:</h4>
            <h4 className="info">Doar o poza</h4>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImgPremii(e.target.files[0]);
              }}
            />
            <h4>Anul premiului</h4>
            <input
              type="number"
              placeholder="an"
              onChange={(e) => setPremiian(e.target.value)}
            />
            <h4>Descrierea premiului</h4>
            <textarea
              placeholder="text"
              onChange={(e) => setTextPremii(e.target.value)}
            />
            <button type="submit" className="button" onClick={upload_premii}>
              submit
            </button>
          </div>

          <div className="stemText">
            <div className="more">
              <div className="press" onClick={more7}>
                <i className={clasa7}></i>
                <span id="STEM">
                  Arată toate premiile {"("}
                  {premii && premii.length}
                  {")"}
                </span>
              </div>
              <div
                className="hide"
                style={{ height: h7, transition: "0.5s ease-in-out" }}
              >
                <div
                  className="scrollcnt"
                  style={{ width: "calc( 100vw - 300px )" }}
                >
                  <div className="loc_de_premii">
                    <h1>Premii</h1>
                    <div className="coca"></div>
                    <h2>Since 2017</h2>
                  </div>
                  <ScrollContainer className="scc">
                    <div className="poate">
                      <div className="space"></div>
                      {premii &&
                        premii.map((premiu) => (
                          <Card
                            delete_premiu={() => delete_premiu(premiu.id)}
                            bafta={true}
                            key={premiu.id}
                            an={premiu.an}
                            text={premiu.text}
                            image={premiu.img}
                          />
                        ))}
                    </div>
                  </ScrollContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiiPage;
