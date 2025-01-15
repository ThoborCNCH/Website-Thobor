import "./PentruSponsori.scss"
import { useState } from "react";
import { addDoc, collection} from "firebase/firestore"; 
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

const pageVariants = {
  initial: {  opacity: 0 },
  animate: {  opacity: 1 },
  exit: { opacity: 0 },
};


function PentruSponsori( { storage, dataBase } ) {

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 100) {
        document.querySelector("#sd-container").style.opacity = "0%";
      } else {
        document.querySelector("#sd-container").style.opacity = "100%";
      }
    },
    { passive: true }
  );

  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [initial, setInitial] = useState('');
  const [cnp, setCNP] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [bloc, setBloc] = useState('');
  const [etaj, setEtaj] = useState('');
  const [apartament, setApartament] = useState('');
  const [strada, setStrada] = useState('');
  const [scara, setScara] = useState('');
  const [numar, setNumar] = useState('');
  const [judet, setJudet] = useState('');
  const [localitate, setLocalitate] = useState('');
  const [codPostal, setCodPostal] = useState('');
  const [semnatura, setSemnatura] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !firstName) {
      alert("A full name is required");
      return;
    }

    if ((!(bloc && etaj && apartament && scara) || !(strada && numar)) && !(judet && localitate && codPostal)) {
      alert("A valid address is required");
      return;
    }

    if (!semnatura) { 
      alert("A signature is required");
      return; 
    }

    if (!hasHandledImageUpload()) {
      alert("Image could not be uploaded properly!");
      return;
    }

    // Construct data object to be sent to Firebase
    const data = {
      name: name,
      firstName: firstName,
      initial: initial,
      cnp: cnp,
      email: email,
      tel: tel,
      bloc: bloc,
      etaj: etaj,
      apartament: apartament,
      strada: strada,
      scara: scara,
      numar: numar,
      judet: judet,
      localitate: localitate,
      codPostal: codPostal,
    };


    addDoc(collection(dataBase, 'ANAF'), data)
      .then(() => {

        alert('Data sent successfully!');

        setName('');
        setFirstName('');
        setInitial('');
        setCNP('');
        setEmail('');
        setTel('');
        setBloc('');
        setEtaj('');
        setApartament('');
        setStrada('');
        setScara('');
        setNumar('');
        setJudet('');
        setLocalitate('');
        setCodPostal('');
        setSemnatura('');
      })
      .catch((error) => {
        alert('Error sending data: ', error);
      });
  };

  const hasHandledImageUpload = () => {
    uploadBytes(ref(storage, `semnaturi-pt-anaf/${name}_${firstName}___${v4()}`), semnatura)
      .catch((error) => {
        console.log('Error uploading image: ', error);
        return false;
      });

    return true;
  };

  const handleCameraClick = () => {
    document.getElementById("Camera").click();
  }

  const showFormular = () => {
    if (window.innerWidth >= 700)
      document.querySelector(".formular").style.display = "grid";
    else
      document.querySelector(".formular").style.display = "flex";
    document.getElementById("firstPage").style.display = "none";
  }

  return(
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 2 }}
      style={{ padding: "0px", textAlign: "center" }}
    >
      <div id="sd-container">
        <div className="arrow"></div>
        <div className="arrow"></div>
      </div>
      <div className = "content" id="firstPage">
        <h2 class = "shadowText">Redirecționează online 3.5% din impozitul pe venit</h2>
        <h2 class = "shadowText">Tu completezi iar noi ne ocupăm să depunem formularul la ANAF.</h2>
        <br/><br/>
        <button className = "clarifyButton shadowText" onClick = {showFormular}>Completeaza formularul online</button>
      </div>
      <div className = "formular" id="test">
        <section>
          <input type="text" id="Name" 
            onChange = {(e) => setName(e.target.value)} value = {name} />
          <label htmlFor="Name">Nume</label>
        </section>
        <section>
          <input type="text" id="Prenume" 
            onChange = {(e) => setFirstName(e.target.value) }  value = {firstName} />
          <label htmlFor="Prenume">Prenume</label>
        </section>
        <section>
          <input type="text" id="InitialaTatalui" 
            onChange = {(e) => setInitial(e.target.value) } value = {initial}/>
          <label htmlFor="InitialaTatalui">Initiala Tatalui</label>
        </section>
        <section>
          <input type="text" id="CNP" 
            onChange = {(e) => setCNP(e.target.value) } value = {cnp}/>
          <label htmlFor="CNP">CNP</label>
        </section>
        <section>
          <input type="email" id="Email" 
            onChange = {(e) => setEmail(e.target.value) } value = {email}/>
          <label htmlFor="Email">Email</label>
        </section>
        <section>
          <input type="tel" id="NrTelefon" 
            onChange = {(e) => setTel(e.target.value) } value = {tel}/>
          <label htmlFor="NrTelefon">Numar de Telefon</label>
        </section>
        <section>
          <input type="text" id="Bloc" 
            onChange = {(e) => setBloc(e.target.value) } value = {bloc}/>
          <label htmlFor="Bloc">Bloc</label>
        </section>
        <section>
          <input type="text" id="Etaj" 
            onChange = {(e) => setEtaj(e.target.value) } value = {etaj}/>
          <label htmlFor="Etaj">Etaj</label>
        </section>
        <section>
          <input type="text" id="Apartament" 
            onChange = {(e) => setApartament(e.target.value) } value = {apartament}/>
          <label htmlFor="Apartament">Apartament</label>
        </section>
        <section>
          <input type="text" id="Strada" 
            onChange = {(e) => setStrada(e.target.value) } value = {strada}/>
          <label htmlFor="Strada">Strada</label>
        </section>
        <section>
          <input type="text" id="Scara" 
            onChange = {(e) => setScara(e.target.value) } value = {scara}/>
          <label htmlFor="Scara">Scara</label>
        </section>
        <section>
          <input type="text" id="Numar" 
            onChange = {(e) => setNumar(e.target.value) } value = {numar}/>
          <label htmlFor="Numar">Numar</label>
        </section>
        <section>
          <input type="text" id="Judet" 
            onChange = {(e) => setJudet(e.target.value) } value = {judet}/>
          <label htmlFor="Judet">Judet</label>
        </section>
        <section>
          <input type="text" id="Localitate" 
            onChange = {(e) => setLocalitate(e.target.value) } value = {localitate}/>
          <label htmlFor="Localitate">Localitate</label>
        </section>
        <section>
          <input type="number" id="CodPostal" 
            onChange = {(e) => setCodPostal(e.target.value) } value = {codPostal}/>
          <label htmlFor="CodPostal">Cod Postal</label>
        </section>
        <section id="image">

          <input 
            type="file" 
            id="Camera" 
            onChange = {(e) => {
              setSemnatura(e.target.files[0])
              document.getElementById("Semnatura").style.display='none'
              document.getElementById("camTxt").style.display='inline'

            } }
            accept = "image/*" capture = "camera" 
          />
          <div className = "buttonSeparator">
            <span id="camTxt">Image Loaded Succesfully!</span>
            <input 
              type="file" 
              id = "Semnatura" 
              onChange = {(e) => setSemnatura(e.target.files[0]) }
              accept = "image/*" 
            />

            <button id = "cameraButton" onClick = {handleCameraClick} />
          </div>


          <label htmlFor="Semnatura">O poză cu semnătura</label>
        </section>
        <button onClick = { handleSubmit }>Submit</button>
        <section>
          <Link to="/privacyPolicy">Privacy Policy</Link>
          <Link to="/termsAndConditions">Terms and Conditions</Link>
        </section>
      </div>
      <div className = "content">
        <h2>
          <b class = "shadowText">Care e obiectivul nostru?</b><br/><br/>
Echipa de robotică Thobor RO068 din Tecuci își propune să promoveze și să dezvolte educația STEAM local, ajutând tinerii să își construiască un viitor promițător. Prin activități educative și un program de voluntariat, elevii își dezvoltă abilități esențiale și explorează cariere potențiale. Participăm activ la campionatul național First Tech Challenge România, aducând Tecuciul în prim-planul roboticii românești.

Vă invităm să contribuiți la aceste eforturi, direcționând 3,5% din impozitul pe venit către echipa noastră. Susținerea dumneavoastră este esențială pentru continuarea și extinderea programelor noastre.</h2>
        <br/><br/>
      <h2>
        <b class = "shadowText">De ce să faci asta?</b><br/><br/>
        Pentru că e GRATUIT, transparent, iar efectele acțiunii tale se vor vedea reușitele echipei. Dacă nu redirecționezi, el va fi alocat din oficiu către Bugetul General Consolidat, iar modul în care banii vor fi cheltuiți nu este cunoscut și nu se află în controlul tău.
      </h2>
      </div>
      <div className="content">
        <h2 id="casetaVerde" class = "shadowText"> Completeaza formularul offline </h2>
        <br/><br/>
        <div className = "formulareOffline">
          <h2 class = "shadowText">Ai venituri din salariu sau asimilate salariilor?</h2>
          <h2 class = "shadowText">Ai venituri din alte surse?</h2>
          <a href="https://firebasestorage.googleapis.com/v0/b/thobor-website.appspot.com/o/230_OPANAF_15_2021.pdf?alt=media&token=82b214fa-fe35-4d60-ac27-d70868541335" >Descarca formularul 230</a>
          <a href="https://static.anaf.ro/static/10/Anaf/Declaratii_R/declaratie_unica.html" >Descarca declaratia unica</a>
        </div>
        <br/><br/> <br/><br/>
        <p>Dupa ce v-ati completat datele, trimite-le prin poștă sau depune online dacă ai cont ANAF. Îți mulțumim pentru susținere!</p>
      </div>
    </motion.div>
  );

}

export default PentruSponsori;
