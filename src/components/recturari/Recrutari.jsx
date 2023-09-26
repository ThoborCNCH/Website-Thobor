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
      answer: "Rolul Departamentului de jurnal este de a crea jurnalul care cuprinde toată activitatea realizată de echipă în decursul sezonului, atât tehnică cât și non-tehnică."
    },
    {
      question: "Cu ce programe sunt create jurnalele în acest departament?",
      answer: "Programele folosite pentru conceperea jurnalului Adobe Illustrator, Canva și Adobe Indesign."
    },
    {
      question: "Care sunt calitățile necesare pentru a deveni un membru al Departamentului de jurnal?",
      answer: "Calitățile necesare includ creativitatea, dorința de a învăța și experimenta, abilități de comunicare cu oamenii și răbdare."
    },
    {
      question: "Ce tipuri de activități sunt incluse în jurnalul creat de acest departament?",
      answer: "Jurnalul cuprinde absolut tot ce înseamnă activitatea echipei, de la istorie, obiective, mod de lucru, social media până la abslut fiecare detaliu tehnic privind perspectiva de proiectare, ansamblare și programare a robotului. "
    }, {
      question: "Sunt necesare cunoștințe de design sau copywriting?",
      answer: "Răspunsul este da dar dacă nu există, dobândite prin participarea la activități exterioare de voluntariat, acestea vor fi învățate de la 0, între membrii departamentului prin experiențele celor mai mari."
    }
  ]


  return(
    <div id="content">
      <LazyLoadImage src={thoborPfp} alt="ThoborIcon" id="profile-pic" title="Thobor!"/>

      <div id="shortcuts">
        <div className="shortcut" >
          <a target="blank"  href="https://firstinspiresst01.blob.core.windows.net/first-in-show-ftc/game-manual-part-1-traditional.pdf"><LazyLoadImage src={pdfImg} alt="Formular" className="image" /></a>
          <p>Game Manual 1</p>
        </div>
        <div className="shortcut">
          <a target="blank" href="https://firstinspiresst01.blob.core.windows.net/first-in-show-ftc/game-manual-part-1-remote.pdf"><LazyLoadImage src={pdfImg} alt="Formular" className="image" /></a>
          <p>Game Manual 1 Remote</p>
        </div>
        <div className="shortcut">
          <LazyLoadImage src={formularImg} alt="Formular" className="image" />
          <p>Formular Inscriere</p>
        </div>
        <div className="shortcut">
          <a  target="blank" href="https://firstinspiresst01.blob.core.windows.net/first-in-show-ftc/game-manual-part-2-traditional.pdf"><LazyLoadImage src={pdfImg} alt="Formular" className="image" /></a>
          <p>Game Manual 2</p>
        </div>
        <div className="shortcut">
          <a  target="blank" href="https://firstinspiresst01.blob.core.windows.net/first-in-show-ftc/game-manual-part-2-remote.pdf"><LazyLoadImage src={pdfImg} alt="Formular" className="image" /></a>
          <p>Game Manual 2 Remote</p>
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
          <button onClick={() => {showPopup(); setupPopup("Mecanica");}} className="dropdown-option">
              <ClockIcon />
              Mecanica
          </button>
          <button onClick={() => {showPopup(); setupPopup("Proiectare 3D");}} className="dropdown-option">
              <ClockIcon />
              Proiectare 3D</button>
          <button onClick={() => {showPopup(); setupPopup("Programare");}} className="dropdown-option">
              <ClockIcon />
              Programare</button>
          <button onClick={() => {showPopup(); setupPopup("Marketing");}} className="dropdown-option">
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
