import "./formularOnline.scss";
import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";

function FormularOnline({ storage, dataBase }) {
  const sigCanvas = useRef(null);
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [initial, setInitial] = useState("");
  const [cnp, setCNP] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [bloc, setBloc] = useState("");
  const [etaj, setEtaj] = useState("");
  const [apartament, setApartament] = useState("");
  const [strada, setStrada] = useState("");
  const [scara, setScara] = useState("");
  const [numar, setNumar] = useState("");
  const [judet, setJudet] = useState("");
  const [localitate, setLocalitate] = useState("");
  const [codPostal, setCodPostal] = useState("");
  const [semnatura, setSemnatura] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !firstName) {
      alert("Un nume și prenume este necesar.");
      return;
    }
    if (!judet || !localitate || !codPostal) {
      alert("O adresă validă este necesară.");
      return;
    }
    if (!semnatura) {
      alert("E nevoie de o semnătură.");
      return;
    }

    const signatureImage = sigCanvas.current.toDataURL("image/png");
    const signatureBlob = await fetch(signatureImage).then((res) => res.blob());
    const signatureRef = ref(storage, `semnaturi-pt-anaf/${name}_${firstName}___${v4()}.png`);
    const metadata = { contentType: "image/png" };
    await uploadBytesResumable(signatureRef, signatureBlob, metadata);

    const data = {
      name,
      firstName,
      initial,
      cnp,
      email,
      tel,
      bloc,
      etaj,
      apartament,
      strada,
      scara,
      numar,
      judet,
      localitate,
      codPostal,
      signatureURL: signatureRef.fullPath,
    };

    try {
      await addDoc(collection(dataBase, "ANAF"), data);
      alert("Formularul a fost trimis cu succes!");
      clearForm();
    } catch (error) {
      alert("A intervenit o problema cu formularul: " + error);
    }
  };

  const clearForm = () => {
    setName("");
    setFirstName("");
    setInitial("");
    setCNP("");
    setEmail("");
    setTel("");
    setBloc("");
    setEtaj("");
    setApartament("");
    setStrada("");
    setScara("");
    setNumar("");
    setJudet("");
    setLocalitate("");
    setCodPostal("");
    setSemnatura(null);
    sigCanvas.current.clear();
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setSemnatura(null);
  };

  const checkSignature = () => {
    if (!sigCanvas.current.isEmpty()) {
      setSemnatura(true);
    }
  };

  return (
    <div className="form-container p-4">
      <h2 className="shadowText">Formular pentru Declarația 230</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Nume" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Prenume" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Inițiala Tatălui" value={initial} onChange={(e) => setInitial(e.target.value)} />
        <input type="text" placeholder="CNP" value={cnp} onChange={(e) => setCNP(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Telefon" value={tel} onChange={(e) => setTel(e.target.value)} required />
        <a></a>
        <input type="text" placeholder="Bloc" value={bloc} onChange={(e) => setBloc(e.target.value)} />
        <input type="text" placeholder="Scara" value={scara} onChange={(e) => setScara(e.target.value)} />
        <input type="text" placeholder="Etaj" value={etaj} onChange={(e) => setEtaj(e.target.value)} />
        <input type="text" placeholder="Apartament" value={apartament} onChange={(e) => setApartament(e.target.value)} />
        <a></a>
        <input type="text" placeholder="Strada" value={strada} onChange={(e) => setStrada(e.target.value)} required />
        <input type="text" placeholder="Număr" value={numar} onChange={(e) => setNumar(e.target.value)} required />
        <input type="text" placeholder="Județ" value={judet} onChange={(e) => setJudet(e.target.value)} required />
        <input type="text" placeholder="Localitate" value={localitate} onChange={(e) => setLocalitate(e.target.value)} required />
        <input type="text" placeholder="Cod Poștal" value={codPostal} onChange={(e) => setCodPostal(e.target.value)} required />
        <h2 className="shadowText">Semnătură online</h2>
        <div className="border border-gray-100 rounded-lg p-1">
          <SignatureCanvas ref={sigCanvas} penColor="white" onEnd={checkSignature} canvasProps={{ className: "signatureCanvas" }} />
        </div>
        <button type="button" className="shadowText button button-clear" onClick={clearSignature}>
          Șterge Semnătura
        </button>
        <button type="submit" className="shadowText button button-submit">
          Trimite Formular
        </button>
      </form>
    </div>
  );
}

export default FormularOnline;
