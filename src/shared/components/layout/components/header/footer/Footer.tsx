import style from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.inner}>
        
        {/* 1. LOGO A LA IZQUIERDA */}
        <div className={style.brand}>
          <img src="/logo-f.png" alt="Flashwise Logo" className={style.logo} />
          <span className={style.brandName}>Flashwise</span>
        </div>

        {/* 2. FRASE AL CENTRO */}
        <span className={style.tagline}>Estudiá con intención.</span>

        {/* 3. COPYRIGHT A LA DERECHA */}
        <span className={style.copyright}>
          © {new Date().getFullYear()} Flashwise. Todos los derechos reservados.
        </span>

      </div>
    </footer>
  );
}

export default Footer;