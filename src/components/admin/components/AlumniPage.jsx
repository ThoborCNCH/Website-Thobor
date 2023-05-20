import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Generatie from "../../alumni/components/Generatie";
import Firestore from "../../utils/Firestore";

const firestore = new Firestore();
function AlumniPage({ anii, alumnii }) {
  const [user, loading, error] = useAuthState(firestore.getuser());

  const [anistate, setAni] = useState("");
  const [nume_alumni, setAlumninume] = useState("");
  const [detalii_alumni, setdetaliialumni] = useState("");
  const [poza_alumni, setPozealumni] = useState();
  const [text_alumni, setTextalumni] = useState("");
  const [loadingg_alumni, SetloadinggAlumni] = useState(false);

  const [alumni, setAlumni] = useState([]);
  const getAlumni = async () => {
    await firestore.readDocuments("team_member").then((res) => {
      setAlumni(res);
    });
  };

  const upload_alumni = async () => {
    const { uid } = user;
    let added = {
      nume: nume_alumni,
      //uid: uid,
      ani: anistate,
      detalii: detalii_alumni,
      text: text_alumni,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    SetloadinggAlumni(true);
    const storage = getStorage();

    const storageRef = ref(storage, `alumni/${poza_alumni.name}`);
    try {
      await uploadBytes(storageRef, poza_alumni);
      const url = await getDownloadURL(storageRef);
      added.poza = url;
    } catch (error) {
      alert(error);
    }

    await firestore
      .addItem("team_member", added)
      .then(async (res) => {
        alert("alumni adaugat");
        SetloadinggAlumni(false);
        setAni("Alege un an");
        setAlumni((old) => [res, ...old]);
      })
      .catch((err) => alert(err));
  };

  const delete_alumni = async (e) => {
    await firestore.deleteDocument("team_member", e).then(async (res) => {
      alert("Alumni sters");
      setAlumni((old) => (old = old.filter((o) => o.id != e)));
    });
  };

  const [ani, setAnis] = useState([]);

  useEffect(() => {
    setAnis((old) => (old = anii));
    setAlumni((old) => (old = alumnii));
  }, [anii, alumnii]);

  const alumniByYear = ani.map((an) => {
    const filteredAlumni = alumni.filter((al) => al.ani === an.ani);
    const alumniElements = filteredAlumni.map((alumni) => ({
      key: alumni.id,
      no: true,
      id: alumni.id,
      delete_this_mama: delete_alumni,
      img: alumni.poza,
      nume: alumni.nume,
      faculta: alumni.detalii,
      text: alumni.text,
    }));
    return alumniElements;
  });

  const [clasa4, setClasa4] = useState("fas fa-caret-right");
  const [h4, setH4] = useState("0");

  function more4() {
    if (clasa4 === "fas fa-caret-up") {
      setClasa4("fas fa-caret-right");
      setH4("0");
    } else {
      setClasa4("fas fa-caret-up");
      setH4("auto");
    }
  }
  return (
    <div className="adminpage">
      <div className="blogs_part">
        <div className="form">
          <h1>FOR ALUMNI</h1>
          <select value={anistate} onChange={(e) => setAni(e.target.value)}>
            <option value="null">Alege un an</option>
            {ani &&
              ani.map((an) => {
                return <option value={an.ani}>{an.ani}</option>;
              })}
          </select>
          <input
            type="text"
            placeholder="nume"
            value={nume_alumni}
            onChange={(e) => setAlumninume(e.target.value)}
          />
          <h4 className="info">Sa se scrie facultatea terminata/actuala</h4>
          <input
            type="text"
            value={detalii_alumni}
            placeholder="detalii"
            onChange={(e) => setdetaliialumni(e.target.value)}
          />
          <textarea
            placeholder="text"
            value={text_alumni}
            onChange={(e) => setTextalumni(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setPozealumni(e.target.files[0]);
            }}
          />
          <button
            type="submit"
            disabled={loadingg_alumni ? true : false}
            className="button"
            onClick={upload_alumni}
          >
            {loadingg_alumni ? "loadingg" : "submit"}
          </button>
        </div>

        <div className="stemText">
          <div className="more">
            <div className="press" onClick={more4}>
              <i className={clasa4}></i>
              <span id="STEM">
                Arată toti alumnii {"("}
                {alumni && alumni.length}
                {")"}
              </span>
            </div>
            <div
              className="hide"
              style={{ height: h4, transition: "0.5s ease-in-out" }}
            >
              {ani &&
                ani.map((an, index) => {
                  if (alumniByYear[index].length !== 0)
                    return (
                      <Generatie
                        no={true}
                        years={an.ani}
                        team={false}
                        key={ani.id}
                        persoane={alumniByYear[index]}
                      />
                    );
                })}

              {ani &&
                ani.map((ani) => {
                  alumni &&
                    alumni.map((alumni) => {
                      if (alumni.ani == ani.ani) {
                        return <h1>asdkjbasdk</h1>;
                      }
                    });
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlumniPage;
