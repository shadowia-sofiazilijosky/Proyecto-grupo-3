import style from "./footer.module.css";

const Footer = () => {

return (
  <footer className={style.footer}>
    <div className={style.inner}>
      <span className={style.brand}>
        <span className={style.brandMark}>✦</span>
        <span className={style.brandName}>Flashwise</span>
      </span>

      <p className={style.tagline}>Estudiá con intención.</p>

      <span className={style.copy}>© {new Date().getFullYear()}</span>
    </div>
  </footer>
);
}

export default Footer
