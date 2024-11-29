import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Apps from "./components/apps/Apps";
import Despre from "./components/despre/Despre";
import Home from "./components/home/Home";
import NotFound from "./components/notfound/NotFound";
import Firestore from "./components/utils/Firestore";
import Footer from "./components/utils/Footer";
import Navbar from "./components/utils/Navbar";
import Recrutari from "./components/recrutari/Recrutari"
import PentruSponsori from "./components/pentruSponsori/PentruSponsori"
import PrivacyPolicy from "./components/pentruSponsori/PrivacyPolicy/PrivacyPolicy"
import TOS from "./components/pentruSponsori/TOS/TOS"

const firestore = new Firestore();

function App() {

  const [spon, setSpon] = useState([]);
  const getSpon = useMemo(() => async () => {
    await firestore.readDocuments("sponsori").then((res) => {
      setSpon(res);
    }).catch(er=>{
      console.log(er);
    });
  }, [setSpon]);
  const [premii, setPremii] = useState([]);
  const getPremii = useMemo(() => async () => {
    await firestore.sortdata("premii", "an", "desc").then((res) => {
      setPremii(res);
    });
  }, [setPremii]);

  const [apps, setApps] = useState([]);
  const getApps = useMemo(() => async () => {
    await firestore.readDocuments("aplicatii").then((res) => {
      setApps(res);
    }).catch(er => {
      console.log(er);
    })
  }, [setApps]);

  useEffect(() => {
    getApps();
    getSpon();
    getPremii();
  }, [getApps, getSpon, getPremii]);

  const d = new Date();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home premii={premii} spon = {spon}/>} />
        <Route path="/despre" element={<Despre />} />
        <Route path="/apps" element={<Apps apps={apps} />} />
        <Route path="/download" element={<Apps />} />
        <Route path="/pentruSponsori" element={<PentruSponsori storage={firestore.storage} dataBase = {firestore.getDb()}/>} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy/>} />
        <Route path="/termsAndConditions" element={<TOS/>} />
        <Route path="*" element={<NotFound />} />
        {
          d.getMonth() >= 9 && d.getMonth() <= 10 &&
            <Route path="/recrutari" element={<Recrutari />} />
        }
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
export default App;
