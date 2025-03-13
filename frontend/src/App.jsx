import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CadastrarEvento from './pages/CadastrarEvento';
import GerenciarEventos from './pages/GerenciarEventos';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="home w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastrar" element={<CadastrarEvento />} />
            <Route path="/gerenciar" element={<GerenciarEventos />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
