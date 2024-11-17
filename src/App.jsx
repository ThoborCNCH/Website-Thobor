import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from './components/utils/Navbar';
import Footer from './components/utils/Footer';
import Home from './components/home/Home';
import Roboti from './components/roboti/Roboti';
import Background from './components/utils/background';
import Departamente from './components/departamente/Departamente';

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
    <Routes>
      <Route path="/" element={<Home key={location.pathname} />} />
      <Route path="/departamente" element={<Departamente key={location.pathname} />} />
      <Route path="/roboti" element={<Roboti key={location.pathname} />} />
    </Routes>
  );
}

export default App;
