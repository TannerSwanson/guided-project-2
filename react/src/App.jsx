import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Planet from './components/Planet';
import './App.css'

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/planet" element={<Planet />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
