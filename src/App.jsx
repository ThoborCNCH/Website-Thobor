import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from './components/blog/Blog';
import BlogPost from './components/blog/BlogPost';
import Home from './components/home/Home';
import Navbar from './components/utils/Navbar';
import Footer from './components/utils/Footer';
// import ScrollToTop from './components/utils/ScrollToTop';

function App() { 

  return (
    <BrowserRouter>
      {/* <ScrollToTop */}
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/blog' element={<Blog/>} />
        <Route path='/blog/:id' element={<BlogPost/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
