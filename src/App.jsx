import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from './components/utils/navbarNew';
import Footer from './components/utils/Footer';
import Home from './components/home/Home';
import Roboti from './components/roboti/Roboti';
import Background from './components/utils/background';
import Departamente from './components/departamente/Departamente';
import PentruSponsori from './components/pentruSponsori/PentruSponsori';
import Apps from './components/apps/Apps';
import TOS from './components/pentruSponsori/TOS/TOS';
import PrivacyPolicy from './components/pentruSponsori/PrivacyPolicy/PrivacyPolicy';
import NotFound from './components/notfound/NotFound';
import { AnimatePresence } from "framer-motion";

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

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home key={location.pathname} />} />
        <Route path="/termsAndConditions" element={<TOS key={location.pathname} />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy key={location.pathname} />} />
        <Route path="/pentruSponsori" element={<PentruSponsori key={location.pathname} />} />
        <Route path="/apps" element={<Apps key={location.pathname} />} />
        <Route path="/departamente" element={<Departamente key={location.pathname} />} />
        <Route path="/roboti"/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
