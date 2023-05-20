import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Firestore from "../../utils/Firestore";
import { LazyLoadImage } from "react-lazy-load-image-component";

const firestore = new Firestore();

function AppsPage({ appss }) {
  const [user, loading, error] = useAuthState(firestore.getuser());
  const [descriere, setDescriere] = useState("");
  const [cod_qr, setCodqr] = useState();
  const [cod_qr_links, setCodqrlinks] = useState("");
  const [img, setImg] = useState();
  const [imglinks, setImgLinks] = useState("");
  const [titlu_app, setTitluApp] = useState("");
  const [link, setLink] = useState("");
  const [link_text, setLinkText] = useState("");
  const [loadingg_apps, setloadinggApps] = useState(false);

  const [apps, setApps] = useState(appss);

  useEffect(() => {
    setApps((old) => (old = appss));
  }, [appss]);

  const submit_app = async () => {
    const { uid } = user;

    let ar = [cod_qr, img];

    let object = {
      titlu: titlu_app,
      //uid: uid,
      descriere,
      link,
      link_text,
      cod_qr: cod_qr_links,
      img: imglinks,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const storage = getStorage();
    setloadinggApps(true);
    for (let i = 0; i < ar.length; i++) {
      const image = ar[i];
      const storageRef = ref(storage, `apps/${image.name}`);
      try {
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        if (i == 0) {
          object.img = url;
        } else {
          object.cod_qr = url;
        }
      } catch (error) {
        alert(error);
      }
    }

    await firestore.addItem("apps", object).then(async (res) => {
      alert("app adaugat");
      document.querySelectorAll("input, select, textarea").forEach((input) => {
        input.value = "";
      });
      setApps((old) => [res, ...old]);
      setloadinggApps(false);
    });
  };

  const deleteapp = async (e) => {
    await firestore.deleteDocument("apps", e).then(async (res) => {
      alert("sters cu succes");
      setApps((old) => (old = old.filter((o) => o.id != e)));
    });
  };

  const [clasa2, setClasa2] = useState("fas fa-caret-right");
  const [h2, setH2] = useState("0");

  function more2() {
    if (clasa2 === "fas fa-caret-up") {
      setClasa2("fas fa-caret-right");
      setH2("0");
    } else {
      setClasa2("fas fa-caret-up");
      setH2("auto");
    }
  }
  return (
    <div className="adminpage">
      <div className="apps_part">
        <div className="form">
          <h1>FOR APPS</h1>
          <h4 className="info">Set the img.</h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />
          <h4 className="info">Set the Qr code</h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setCodqr(e.target.files[0]);
            }}
          />
          <input
            type="url"
            placeholder="link"
            onChange={(e) => setLink(e.target.value)}
          />
          <input
            type="text"
            placeholder="link text"
            onChange={(e) => setLinkText(e.target.value)}
          />
          <textarea
            placeholder="descriere"
            onChange={(e) => setDescriere(e.target.value)}
          />
          <textarea
            placeholder="titlu"
            onChange={(e) => setTitluApp(e.target.value)}
          />
          <button
            type="submit"
            disabled={loadingg_apps ? true : false}
            className="button"
            onClick={submit_app}
          >
            {loadingg_apps ? "loadingg" : "submit"}
          </button>
        </div>

        <div className="stemText">
          <div className="more">
            <div className="press" onClick={more2}>
              <i className={clasa2}></i>
              <span id="STEM">
                Arată apps {"("}
                {apps && apps.length}
                {")"}
              </span>
            </div>
            <div
              className="hide"
              style={{
                height: h2,
                transition: "0.5s ease-in-out",
                width: "100%",
              }}
            >
              <div className="apps" style={{ width: "100%" }}>
                {apps &&
                  apps.map((app) => (
                    <>
                      <div
                        key={app.id}
                        className="app"
                        style={{ width: "100%" }}
                      >
                        <div className="top" style={{ width: "100%" }}>
                          <div className="img">
                            <LazyLoadImage
                              src={app.cod_qr}
                              alt=""
                              width={"calc(100% + 30px)"}
                              height={"auto"}
                            />
                          </div>
                          <div className="txt">
                            <div className="title">
                              <h1>{app.titlu}</h1>
                              <div className="linie"></div>
                            </div>
                            <div className="text">
                              <div className="linie_vert"></div>
                              <p>{app.descriere}</p>
                            </div>
                            <button
                              className="button"
                              style={{
                                width: "100%",
                                margin: "30px 0",
                              }}
                              onClick={() => deleteapp(app.id)}
                            >
                              delete app
                            </button>
                          </div>
                        </div>

                        <a href={app.link} target="_blank" className="button">
                          {app.link_text}
                        </a>
                        {app.img && (
                          <div className="qr_cont">
                            <LazyLoadImage
                              src={app.img}
                              width={300}
                              height={300}
                              className="qr"
                              alt=""
                            />
                          </div>
                        )}
                        <div className="linie_sep"></div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppsPage;
