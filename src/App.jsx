import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from './components/blog/Blog';
import Home from './components/home/Home';
import Navbar from './components/utils/Navbar';

function App() { 

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/blog' element={<Blog/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
