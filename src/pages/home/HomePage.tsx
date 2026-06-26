import style from "./home.module.css";
// Opción A: Importamos la imagen como un módulo
import imagenCubos from "../../assets/cubos.png"; 

export function HomePage() {
  return (
    <main className={style.main}>
      
      {/* ─── CONTENEDOR HERO + IMAGEN 3D ─── */}
      <div className={style.heroContainer}>
        <section className={style.hero}>
          <h1 className={style.heading}>
            El conocimiento
            <br />
            no se acumula,
            <br />
            se construye.
          </h1>
          <p className={style.sub}>
            Cada tarjeta es un ladrillo. Cada repaso, un piso más.
          </p>
        </section>

        {/* Contenedor gráfico para los cubos */}
        <div className={style.heroGraphicContainer}>
          {/* Reemplazamos la ruta fija por la variable importada entre llaves */}
          <img src={imagenCubos} alt="Elementos 3D" className={style.heroImage} />
        </div>
      </div>

      <div className={style.divider} />

      {/* ─── TARJETAS CON ÍCONOS SVG VECTORIALES ─── */}
      <section className={style.cards}>
        <article className={style.card}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={style.cardIcon}><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
          <h3 className={style.cardTitle}>Repetición espaciada</h3>
          <p className={style.cardText}>
            Repasar en el momento justo consolida la memoria a largo plazo mejor
            que estudiar horas seguidas.
          </p>
        </article>

        <article className={style.card}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={style.cardIcon}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
          <h3 className={style.cardTitle}>Mantenete activo</h3>
          <p className={style.cardText}>
            Recordar es más poderoso que releer. Ponte a prueba antes de creer
            que ya sabes.
          </p>
        </article>

        <article className={style.card}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={style.cardIcon}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          <h3 className={style.cardTitle}>Consistencia gana</h3>
          <p className={style.cardText}>
            Diez minutos todos los días superan a una maratón semanal. El hábito
            is la estrategia.
          </p>
        </article>
      </section>

      {/* ─── SECCIÓN DE LA CITA CON MEDALLA ─── */}
      <blockquote className={style.quote}>
        <div className={style.quoteContent}>
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#713F12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={style.quoteIcon}><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><polyline points="12 18 13 16 14 17"/></svg>
          
          <div className={style.quoteTextWrapper}>
            <p className={style.quoteText}>
              "Un experto es alguien que cometió todos los errores posibles en un
              campo muy estrecho."
            </p>
            <cite className={style.quoteCite}>— NIELS BOHR</cite>
          </div>
        </div>
      </blockquote>
      
    </main>
  );
}