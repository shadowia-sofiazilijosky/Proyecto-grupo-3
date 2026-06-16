import { NavLink } from "react-router";
import style from "./header.module.css";
import { ROUTES } from "../../../utils/routes";

const Header = () => {

  return (
    <header className={style.header}>
      <div className={style.inner}>
        <span className={style.brand}>
          <span className={style.brandMark}>✦</span>
          <span className={style.brandName}>Flashwise</span>
        </span>

        <nav className={style.nav}>
          <NavLink
            to={ROUTES.HOME}
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.linkActive : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to={ROUTES.CREATECARDS}
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.linkActive : ""}`
            }
          >
            Creá cards
          </NavLink>
          <NavLink
            to={ROUTES.LISTCARDS}
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.linkActive : ""}`
            }
          >
            Cards
          </NavLink>
          <NavLink
            to={ROUTES.STUDYCARDS}
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.linkActive : ""}`
            }
          >
            Estudiar
          </NavLink>

          <NavLink
            to={ROUTES.QUIZ}
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.linkActive : ""}`
            }
          >
            Quiz
          </NavLink>

          {/* 👇 ACÁ AGREGAMOS TU BOTÓN DE PROGRESO */}
          <NavLink
            to="/progress"
            className={({ isActive }) =>
              `${style.link} ${isActive ? style.linkActive : ""}`
            }
          >
            Progreso
          </NavLink>

        </nav>
      </div>
    </header>
  );
}

export default Header