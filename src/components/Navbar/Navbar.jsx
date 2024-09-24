// Navbar.jsx
import  { useState, useEffect } from 'react';
import './Navbar.css'; 
import { Link } from "react-router-dom";

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Função para detectar o tamanho da tela e definir se é mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992); // Define como mobile se a largura for menor que 992px
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Função para abrir e fechar o modal
  const handleToggle = () => {
    if (isMobile) {
      setShowModal(!showModal);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="/image/logo.png"
              alt="Logo"
              style={{ height: '100px', width: '100px' }}
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggle}
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${!isMobile ? '' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto me-4 mb-2 mb-lg-0 fs-5">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/service">Service</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>
            </ul>
            {/*  
            <form className="d-flex gap-2">
              <button className="btn btn-info" type="button">Login</button>
              <button className="btn btn-success" type="button">Signup</button>
            </form>
            */}
          </div>
        </div>
      </nav>

      {/* Modal para o menu que aparece apenas em dispositivos móveis */}
      {isMobile && showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button className="close-btn" onClick={handleClose}>
              &times;
            </button>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" onClick={handleClose} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleClose} to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleClose} to="/service">Service</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleClose} to="/contact">Contact</Link>
              </li>
            </ul>
            <form className="d-flex gap-2">
              <button className="btn btn-info" type="button" onClick={handleClose}>Login</button>
              <button className="btn btn-success" type="button" onClick={handleClose}>Signup</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
