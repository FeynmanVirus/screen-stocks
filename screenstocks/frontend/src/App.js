import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import SearchBar from './components/SearchBar'
import Financials from './pages/Financials';
import Home from './pages/Home';
import Layout from './pages/Layout';
import About from './pages/About';

function App() { 

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="financials" element={<Financials />} />
          <Route path="about" element={<About />} />
        </Route>
        
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
