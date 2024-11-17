import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import KuntaLogo from './Kunta.jpg'; // Tuo kuva src-hakemistosta

const Navbar = ({ userName }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={KuntaLogo} alt="Siilinjärvi logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Osta hävikkiä</Link>
        <Link to="/admin">Hävikin lisäys</Link>
      </div>
      <div className="navbar-user">
        <span className="user-name">Tervetuloa, {userName}!</span>
      </div>
    </nav>
  );
};

export default Navbar;