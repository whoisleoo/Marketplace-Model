import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  return (
     <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<div className="text-center py-8">Página não encontrada</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
