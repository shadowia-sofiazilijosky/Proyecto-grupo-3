import { useState } from "react";
import { NavLink } from "react-router"; // Ojo, en versiones nuevas suele ser "react-router-dom"
import style from "./header.module.css";
import { ROUTES } from "../../../utils/routes";

const Header = () => {
  // Estado para controlar si el menú de celular está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para cerrar el menú cuando tocamos un link
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={style.header}>
      <div className={style.inner}>
        
        {/* LOGO */}
        <span className={style.brand}>
          <img src="/logo-f.png" alt="Flashwise Logo" className={style.logoImage} />
          <span className={style.brandName}>Flashwise</span>
        </span>

        {/* BOTÓN HAMBURGUESA (Solo visible en celulares) */}
        <button 
          className={style.menuToggle} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {/* Ícono SVG de Hamburguesa / Cruz dinámica */}
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>

        {/* NAVEGACIÓN (En celus le agrega la clase .navOpen si tocamos el botón) */}
        <nav className={`${style.nav} ${isMenuOpen ? style.navOpen : ""}`}>
          <NavLink
            to={ROUTES.HOME}
            onClick={closeMenu}
            className={({ isActive }) => `${style.link} ${isActive ? style.linkActive : ""}`}
          >
            HOME
          </NavLink>
          <NavLink
            to={ROUTES.CREATECARDS}
            onClick={closeMenu}
            className={({ isActive }) => `${style.link} ${isActive ? style.linkActive : ""}`}
          >
            CREA CARDS
          </NavLink>
          <NavLink
            to={ROUTES.LISTCARDS}
            onClick={closeMenu}
            className={({ isActive }) => `${style.link} ${isActive ? style.linkActive : ""}`}
          >
            CARDS
          </NavLink>
          <NavLink
            to={ROUTES.STUDYCARDS}
            onClick={closeMenu}
            className={({ isActive }) => `${style.link} ${isActive ? style.linkActive : ""}`}
          >
            ESTUDIAR
          </NavLink>
          <NavLink
            to={ROUTES.QUIZ}
            onClick={closeMenu}
            className={({ isActive }) => `${style.link} ${isActive ? style.linkActive : ""}`}
          >
            QUIZ
          </NavLink>
          <NavLink
            to="/progress"
            onClick={closeMenu}
            className={({ isActive }) => `${style.link} ${isActive ? style.linkActive : ""}`}
          >
            PROGRESO
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;