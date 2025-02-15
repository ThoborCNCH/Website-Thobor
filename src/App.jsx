import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Firestore from "./components/utils/Firestore";
import Navbar from './components/utils/navbarNew';
import Footer from './components/utils/Footer';
import Home from './components/home/Home';
import LoadingScreen from "./components/loading/loading";
import Roboti from './components/roboti/Roboti';
import Background from './components/utils/background';
import Departamente from './components/departamente/Departamente';
import PentruSponsori from './components/pentruSponsori/PentruSponsori';
import Apps from './components/apps/Apps';
import TOS from './components/pentruSponsori/TOS/TOS';
import PrivacyPolicy from './components/pentruSponsori/PrivacyPolicy/PrivacyPolicy';
import NotFound from './components/notfound/NotFound';
import BuyUsACoffee from "./components/utils/BuyUsACoffee.jsx";
import FormularOnline from "./components/pentruSponsori/formularOnline/formularOnline";
import CustomCursor from "./components/utils/cursor";
import { AnimatePresence } from "framer-motion";

const firestore = new Firestore();

function App() {
  return (
    <BrowserRouter>
      <Background />
      <Navbar />
      <MainRoutes />
      <Footer />
    </BrowserRouter>
  );
}

function MainRoutes() {
  const location = useLocation();

  //const [spon, setSpon] = useState([]);
    //const getSpon = useMemo(() => async () => {
    //  await firestore.readDocuments("sponsori").then((res) => {
    //    setSpon(res);
    //  }).catch(er=>{
    //    console.log(er);
    //  });
    //}, [setSpon]);
    //const [premii, setPremii] = useState([]);
    //const getPremii = useMemo(() => async () => {
    //  await firestore.sortdata("premii", "an", "desc").then((res) => {
    //    setPremii(res);
    //  });
    //}, [setPremii]);
    //
    const [apps, setApps] = useState([]);
    const getApps = useMemo(() => async () => {
      await firestore.readDocuments("aplicatii").then((res) => {
        setApps(res);
      }).catch(er => {
        console.log(er);
      })
    }, [setApps]);
    //
    useEffect(() => {
      getApps();
    //  getSpon();
    //  getPremii();
    }, [getApps]);//, getSpon, getPremii]);


  return (
    <AnimatePresence mode="wait">
      <CustomCursor/>
      <Routes>
        <Route path="/"                   element={<Home           key={location.pathname} />} />
        <Route path="/termsAndConditions" element={<TOS            key={location.pathname} />} />
        <Route path="/privacyPolicy"      element={<PrivacyPolicy  key={location.pathname} />} />
        <Route path="/pentruSponsori"     element={<PentruSponsori key={location.pathname} storage={firestore.storage} dataBase={firestore.getDb()}/>} />
        <Route path="/formularOnline"     element={<FormularOnline key={location.pathname} storage={firestore.storage} dataBase={firestore.getDb()}/>} />
        <Route path="/apps"               element={<Apps           key={location.pathname} apps={apps} />} />
        <Route path="/departamente"       element={<Departamente   key={location.pathname} />} />
        <Route path="/roboti"             element={<Roboti         key={location.pathname} />}  />
        <Route path="*"                   element={<NotFound       key="NotFound"/>} />
      </Routes>
      <BuyUsACoffee key="BuyMeACoffee"/>
    </AnimatePresence>
  );
}

export default App;
