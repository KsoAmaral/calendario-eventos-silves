import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; // ou use Tailwind se preferir

const Sidebar = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setIsClosed(!isClosed);
  const toggleMode = () => setDarkMode(!darkMode);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <nav className={`sidebar ${isClosed ? 'close' : ''}`}>
        <header>
          <div className="image-text">
            <div className="text logo-text">
              <span className="name">Prefeitura</span>
              <span className="profession">Silves-AM</span>
            </div>
          </div>
          <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link"><Link to="/"><i className='bx bx-home-alt icon' /><span className="text nav-text">Início</span></Link></li>
              <li className="nav-link"><Link to="/cadastrar"><i className='bx bx-plus-circle icon' /><span className="text nav-text">Cadastrar</span></Link></li>
              <li className="nav-link"><Link to="/gerenciar"><i className='bx bx-edit icon' /><span className="text nav-text">Gerenciar</span></Link></li>
            </ul>
          </div>
          <div className="bottom-content">
            <li className="mode">
              <div className="sun-moon" onClick={toggleMode}>
                <i className='bx bx-moon icon moon'></i>
                <i className='bx bx-sun icon sun'></i>
              </div>
              <span className="mode-text text">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              <div className="toggle-switch"><span className="switch"></span></div>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
