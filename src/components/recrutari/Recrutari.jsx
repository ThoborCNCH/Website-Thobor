import "./Recrutari.scss"
import {useState, useRef} from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";

import thoborLogo from "../../img/img recrutari/Thobor text logo.png"
import thoborPfp  from "../../img/img recrutari/Thobor Account Icon.png"
import formularImg from "../../img/img recrutari/formular.png"
import pdfImg from "../../img/img recrutari/pdf.png"

let isBarToggled = false;
let textUpdateTimeout;

function Recturati() {

  const [text, setText] = useState(() => {return "Cauta mai multe despre noi!"});
  const [textColor, setTextColor] = useState(() => {return 'gray'})
  const [searchbarClasses, setSearchbarClasses] = useState();
  const [popupClasses, setPopupClasses] = useState();
  const departmentsListRef = useRef(null);

  const [popupTitle, setPopupTitle] = useState("");
  const [popupQuestions, setPopupQuestions] = useState([]);

  
  const intrebariJurnal = [ 
    {
      question: "Care este rolul Departamentului de jurnal în cadrul echipei?",
      answer: "Rolul Departamentului de jurnal este de a crea jurnalul, care cuprinde toate activitile realizate de echipă în decursul sezonului."
    },
    {
      question: "Cu ce programe sunt create jurnalele?",
      answer: "Programele folosite pentru conceperea jurnalului sunt: Adobe Illustrator, Canva și Adobe Indesign."
    },
    {
      question: "Care sunt calitățile necesare pentru a deveni un membru al Departamentului de jurnal?",
      answer: "Calitățile necesare includ creativitatea, dorința de a învăța, abilități de comunicare cu oamenii și răbdare."
    },
    {
      question: "Ce tipuri de activități sunt incluse în jurnal?",
      answer: "Jurnalul cuprinde absolut tot ce înseamnă activitatea echipei, de la istorie, obiective, mod de lucru, social media până la absolut fiecare detaliu tehnic privind perspectiva de proiectare, ansamblare și programare a robotului."
    }, {
      question: "Sunt necesare cunoștințe de design sau copywriting?",
      answer: "Răspunsul este da, dar dacă nu există, acestea pot fi învățate de la 0, de la membrii departamentului cu experienta"
    }
  ]

  const intrebariProiectare = [
    {
      question: "Trebuie sa ai anumite cunostinte?",
      answer: "Acest departament nu necesita cunostinte in programe 3D deoarece te vom invata de la 0 dar orice cunostinta e bine venita."
    },
    {
      question: "In ce program lucrati?",
      answer: "Noi lucram in fusion 360."
    },
    {
      question: "Pot lucra si in alt program?",
      answer: "Bineinteles ca se poate lucra si in alt program de exemplu avem colegi care lucreaza in Blender. Important e ca proiectarea unei anumite piese sa se faca parametric."
    },
    {
      question: "Vom lucra cu imprimante 3D?",
      answer: "Da si chiar o sa invatati sa le folositi, noi in echipa avem 6 imprimante."
    },
    {
      question: "Este un departament dificil?",
      answer: "Din contra este un departament chiar frumos, unde iti poti arata creativitatea si in majoritatea timpului o sa ai cate ceva de facut."
    },
  ]

  const intrebariProgramare = [
    {
      question: "Ce face mai exact departamentul de programare?",
      answer: "Departamentul de programare se ocupa de crearea codului pentru manevrarea robotului automat & manual, dar și de aplicatiile și site-ul echipei"
    },
    {
      question: "Ce ași avea nevoie să știu pentru a intra in departament?",
      answer: "In ciuda unor aparente, departamentul de programare nu caută oameni care știu deja sintaxa ului limbaj de programare specific, ci persoane ce detin capacitatea & creativitatea necesară in rezolvarea problemelor ce vor apărea"
    },
    {
      question: "Trebuie sa invat un anumit limbaj de programare pentru a intra?",
      answer: "Deși pentru programarea robotului se folosește Java & Kotlin, nu este necesar sa le înveti pentru a intra în departament, dar în același timp, trebuie sa fii dispus sa înveti unul din ele dupa ce intri."
    },
    {
      question: "Trebuie sa am o anumita experienta pentru a participa?",
      answer: "Chiar daca experienta este utila, nu trebuie sa ai un anumit numar de ore petrecute programand, sau un anumit numar de ani în care ai facut asta."
    },
    {
      question: "Ce hardware ași avea nevoie pentru a lucra?",
      answer: "Ai avea nevoie de un laptop, dar nu unul foarte performant, daca are un procesor Intel i3, 4GB RAM și un SSD de 120GB, you're good to go!"
    },
  ]

  const intrebariMecanica = [
    {
      question: "Trebuie sa am cunostinte avansate de fizica?",
      answer: "Nu, nu e nevoie , trebuie sa cunosti principiile importante si sa ai idee cum se aplica."
    },
    {
      question: "Daca nu am facut mecanica in viata mea pot invata la voi?",
      answer: "Da, desigur chiar suntem genul de persoane deschise la a invata."
    },
    {
      question: "Imi pot aduce contributia ca boboc?",
      answer: "Da, chiar asteptam noi propuneri si ideei, nu ne plafonam doar la o idee, mereu o sugestie e bine venita."
    }
  ]

  const intrebariMerketing = [
    {
      question: "In ce programe lucrati?",
      answer: "Folosim mai multe programe, de la Illustrator, Photoshop, Canva pana la Premier, dar incercam constant programe noi pentru a evolua continu."
    },
    {
      question: "Este nevoie sa cunosc aceste programe?",
      answer: "Nu, in cadrul deparatamentului te invatam noi tot ce stim impartasindune cunostintele cu tine."
    },
    {
      question: "E nevoie sa am experienta pentru acest departament?",
      answer: "Nu, experienta ti-o capeti in timp, aici incepem si crestem impreuna."
    },
    {
      question: "Ce presupune acest departament?",
      answer: "Marketingul se ocupa cu promovarea echipei de robotica pe social media, cu interactiuni cu alte echipe dar si cu oamenii din afara echipei. Noi organizam evenimentele, deplasarile si orice tine de design si video."
    },
    {
      question: "Pot intra aici chiar daca imi e frica sa vorbesc in public?",
      answer: "Da. Majoritatea membrilor de la marketing aveau aceasta frica, dar comunicand mereu intre noi dar si cu celelalte departamente ama juns sa ne facem prieteni si sa reusim sa vorbim in public."
    }
  ]

  return(
    <div id="content">
      <LazyLoadImage src={thoborPfp} alt="ThoborIcon" id="profile-pic" title="Thobor!"/>

      <div id="shortcuts">
        <div className="shortcut" >
          <a target="blank"  href="https://ftc-resources.firstinspires.org/file/ftc/game/manual"><LazyLoadImage src={pdfImg} alt="Formular" className="image" /></a>
          <p>Game Manual</p>
        </div>
        <div className="shortcut">
          <a target="blank" href="https://docs.google.com/forms/d/e/1FAIpQLSf9Mlb7-QzrtmzhgIvl37yzRtUdd0RTMHWubeI1Plk0dUz03w/viewform">
            <LazyLoadImage src={formularImg} alt="Formular" className="image" />
          </a>
          <p>Formular Inscriere</p>
        </div>
      </div>

      <div id="main-area">

        <LazyLoadImage src={thoborLogo} alt="Thobor" id="homepage-logo" />
        <div>
        <button type="button" id="search-bar" className={searchbarClasses} style={{color: {textColor}.textColor }} onClick={(e) => displayOptions(e)}>
          <SearchIcon />
          {text}
        </button>

        <div id="departments-list" ref={departmentsListRef}>
          <button onClick={() => {showPopup(); setupPopup("Mecanica", intrebariMecanica);}} className="dropdown-option">
              <ClockIcon />
              Mecanica
          </button>
          <button onClick={() => {showPopup(); setupPopup("Proiectare 3D", intrebariProiectare);}} className="dropdown-option">
              <ClockIcon />
              Proiectare 3D</button>
          <button onClick={() => {showPopup(); setupPopup("Programare", intrebariProgramare);}} className="dropdown-option">
              <ClockIcon />
              Programare</button>
          <button onClick={() => {showPopup(); setupPopup("Marketing", intrebariMerketing);}} className="dropdown-option">
              <ClockIcon />
              Marketing & PR</button>
          <button onClick={() => {showPopup(); setupPopup("Jurnal", intrebariJurnal);}} className="dropdown-option">
              <ClockIcon />
              Jurnal</button>
          <span className="dropdown-option bottom-options">
            <a href="https://firstinspiresst01.blob.core.windows.net/first-in-show-ftc/game-manual-part-1-traditional.pdf">Game Manual 1</a>
            <a href="https://firstinspiresst01.blob.core.windows.net/first-in-show-ftc/game-manual-part-2-traditional.pdf">Game Manual 2</a>
          </span>
        </div>
        </div>
      </div>

      <div id="popup-content" className={popupClasses}>
        <section id="top-bar">
          <h1>{popupTitle}</h1>
          <button id="closing-button" onClick={() => setPopupClasses("")}>X</button>
        </section>
        <div className="questions">
          {
            popupQuestions.map(question => {
              return(
                <>
                <h6>{question.question}</h6>
                <p>{question.answer}</p>
                </>
              )
            })
          }
        </div>
      </div>

    </div>
  );

  function ClockIcon() {
    return(
           <svg style={{marginRight: '10px'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
    );
  }

  function SearchIcon() {
    return (
        <svg style={{marginRight: '10px'}} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
    );
  }

  function showPopup () {
    toggleDropdown();
    deleteText();
    setSearchbarClasses("");
    isBarToggled = false;

    setPopupClasses("shown-popup");
  }

  function setupPopup(title, questions) {

    setPopupTitle(title ? title : "Popup!");
    if (questions) setPopupQuestions(questions)
    else setPopupQuestions([
      {
        question: "Question 1",
        answer: "Answer 1"
      },
      {
        question: "Question 2",
        answer: "Answer 2"
      }
    ])
  }

  function displayOptions(button) {
    clearTimeout(textUpdateTimeout);
    toggleDropdown();

    if (!isBarToggled) {
      animateText();
      setSearchbarClasses("toggled-scroll-bar");
    } else {
      deleteText();
      setSearchbarClasses("");
    }
      isBarToggled = !isBarToggled;
  }

  function animateText() {
    setTextColor("#0F0F0F");
    const newText = 'Recrutari Thobor';
    let currentText = '';
    let currentIndex = 0;

    function updateText() {
      if (currentIndex < newText.length) {
        currentText += newText.charAt(currentIndex);
        setText(currentText);
        currentIndex++;
        textUpdateTimeout = setTimeout(updateText, 40);
      }
    }

    updateText();
    }

    function deleteText() {
      let currentIndex = {text}.text.length;

      function updateText() {
        if (currentIndex >= 0) {
          setText(prevText => {
            return prevText.slice(0, currentIndex);
          })
          currentIndex--;
          if(currentIndex > 0)
            textUpdateTimeout = setTimeout(updateText,40);
          else updateText();
        } else {
          setText("Cauta mai multe despre noi!")
          setTextColor("gray")
        }
      }

      updateText();
    }

  function toggleDropdown() {
    const currentDisplay = window.getComputedStyle(departmentsListRef.current).getPropertyValue('transform');

    if (currentDisplay === 'matrix(1, 0, 0, 1, 0, 0)' || isBarToggled) {
        departmentsListRef.current.style.transform = 'scaleY(0)';
    } else {
        departmentsListRef.current.style.transform = 'scaleY(1)';
    }
  }

}

export default Recturati;
