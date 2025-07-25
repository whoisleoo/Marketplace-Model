import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login'

function App() {

  return (
     <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className='flex-1'>
        <Routes>
          <Route path="/" element={<Home />} />
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
          <Route path="*" element={<div className="text-center py-8">Página não encontrada</div>} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
