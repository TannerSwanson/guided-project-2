import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Planet from './components/Planet';
import Film from './components/Film';
import './App.css'

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/Planet/:id" element={<Planet />} />
          <Route path="/Film/:id" element={<Film />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
