import style from "./home.module.css";

export function HomePage() {
  return (
    <main className={style.main}>
      <section className={style.hero}>
        <p className={style.eyebrow}>✦ Tu espacio de estudio</p>
        <h1 className={style.heading}>
          El conocimiento
          <br />
          <em>no se acumula,</em>
          <br />
          se construye.
        </h1>
        <p className={style.sub}>
          Cada tarjeta es un ladrillo. Cada repaso, un piso más.
        </p>
      </section>

      <div className={style.divider} />

      <section className={style.cards}>
        <article className={style.card}>
          <span className={style.cardNum}>01</span>
          <h3 className={style.cardTitle}>Repetición espaciada</h3>
          <p className={style.cardText}>
            Repasar en el momento justo consolida la memoria a largo plazo mejor
            que estudiar horas seguidas.
          </p>
        </article>

        <article className={style.card}>
          <span className={style.cardNum}>02</span>
          <h3 className={style.cardTitle}>Mantenete activo</h3>
          <p className={style.cardText}>
            Recordar es más poderoso que releer. Ponete a prueba antes de creer
            que ya sabés.
          </p>
        </article>

        <article className={style.card}>
          <span className={style.cardNum}>03</span>
          <h3 className={style.cardTitle}>Consistencia gana</h3>
          <p className={style.cardText}>
            Diez minutos todos los días superan a una maratón semanal. El hábito
            es la estrategia.
          </p>
        </article>
      </section>

      <blockquote className={style.quote}>
        <p className={style.quoteText}>
          "Un experto es alguien que cometió todos los errores posibles en un
          campo muy estrecho."
        </p>
        <cite className={style.quoteCite}>— Niels Bohr</cite>
      </blockquote>
    </main>
  );
}