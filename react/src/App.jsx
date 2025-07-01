import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Planet from './components/Planet';
import './App.css'
import Characters from './components/Characters';
import Character from './components/Character';

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/planet" element={<Planet />} />
          <Route path="/" element={<Characters />} />
          <Route path="/character/:id" element={<Character />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
