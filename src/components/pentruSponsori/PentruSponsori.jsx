import "./PentruSponsori.scss";
import "../utils/styles/aboutSection.scss";
import { useState } from "react";
import { addDoc, collection} from "firebase/firestore"; 
import { ref, uploadBytesResumable } from "firebase/storage";
import LoadingScreen from "../loading/loading";
import useLoadingManager from "../utils/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";


import sponsorizare1 from '../../images/sponsorizare1.png';
import sponsorizare2 from '../../images/sponsorizare2.png';
import sponsorizare3 from '../../images/sponsorizare3.png';
import sponsorizare4 from '../../images/sponsorizare4.png';
import sponsorizare5 from "../../images/sponsorizare5.png";
import sponsorizare6 from "../../images/sponsorizare6.png";

import { v4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import TextIntro from "../utils/Text";
import Divider from "../utils/divider";
import { motion } from "framer-motion";
import robotIntro from "../../gifs/sponsorizare.gif";
const pageVariants = {
  initial: {  opacity: 0 },
  animate: {  opacity: 1 },
  exit: { opacity: 0 },
};

const totalImages = 1;
function PentruSponsori( { storage, dataBase } ) {
  const navigate = useNavigate();
  const { isLoading, handleImageLoad } = useLoadingManager(totalImages);



  return(
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 2 }}
      style={{ padding: "0px", textAlign: "center" }}
    >
       {isLoading && <LoadingScreen />}
       <div className="overlay-container">
                      <LazyLoadImage 
                          src={sponsorizare1} 
                          alt="" 
                          handleImageLoad={handleImageLoad}
                          className="element sponsorizare1" 
                      />
                      <LazyLoadImage 
                          src={sponsorizare2}  
                          alt="" 
                          handleImageLoad={handleImageLoad}
                          className="element sponsorizare2" 
                      />
                      <LazyLoadImage 
                          src={sponsorizare3}  
                          alt="" 
                          handleImageLoad={handleImageLoad}
                          className="element sponsorizare3" 
                      />
                      <LazyLoadImage 
                          src={sponsorizare4}  
                          alt="" 
                          handleImageLoad={handleImageLoad}
                          className="element sponsorizare4" 
                      />
                       <LazyLoadImage 
                          src={sponsorizare5}  
                          alt="" 
                          handleImageLoad={handleImageLoad}
                          className="element sponsorizare5" 
                      />
                      <LazyLoadImage 
                          src={sponsorizare6}  
                          alt=""
                          handleImageLoad={handleImageLoad} 
                          className="element sponsorizare6" 
                      />
      </div>
       <TextIntro textContent="Sustine echipa!" customStyle={{ marginBottom: '-15vh' }}/>
      <img className = "video-responsiveIntro" onLoad={handleImageLoad} src={robotIntro} alt=""/> 
      <Divider/>
     
      <div className = "content" id="firstPage">
        <h2 className = "shadowText">Redirecționează online 3.5% din impozitul pe venit</h2>
        <h2 className = "shadowText">Tu completezi iar noi ne ocupăm să depunem formularul la ANAF.</h2>
        <br/><br/>
        <button className = "clarifyButton shadowText" onClick={() => navigate("/formularOnline")}>Completeaza formularul online</button>
      </div>
    
      <div className = "content">
        <h2>
          <b className = "shadowText">Care e obiectivul nostru?</b><br/><br/>
Echipa de robotică Thobor RO068 din Tecuci își propune să promoveze și să dezvolte educația STEAM local, ajutând tinerii să își construiască un viitor promițător. Prin activități educative și un program de voluntariat, elevii își dezvoltă abilități esențiale și explorează cariere potențiale. Participăm activ la campionatul național First Tech Challenge România, aducând Tecuciul în prim-planul roboticii românești.

Vă invităm să contribuiți la aceste eforturi, direcționând 3,5% din impozitul pe venit către echipa noastră. Susținerea dumneavoastră este esențială pentru continuarea și extinderea programelor noastre.</h2>
        <br/><br/>
      <h2>
        <b className = "shadowText">De ce să faci asta?</b><br/><br/>
        Pentru că e GRATUIT, transparent, iar efectele acțiunii tale se vor vedea reușitele echipei. Dacă nu redirecționezi, el va fi alocat din oficiu către Bugetul General Consolidat, iar modul în care banii vor fi cheltuiți nu este cunoscut și nu se află în controlul tău.
      </h2>
      </div>
      <TextIntro textContent="Formulare offline" customStyle={{ marginBottom: '-25vh' }}/>
      <div className="content">
        <br/><br/>
        <div className = "formulareOffline">
          <h2 className = "shadowText">Ai venituri din salariu sau asimilate salariilor?</h2>
          <h2 className = "shadowText">Ai venituri din alte surse?</h2>
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
