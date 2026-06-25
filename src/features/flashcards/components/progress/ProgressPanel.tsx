import { useFlashcardStore } from "../../store";
import styles from "./ProgressPanel.module.css";

export const ProgressPanel = () => {
  const { flashcards, streak } = useFlashcardStore();

  const totalStudied = flashcards.filter(card => card.hits > 0 || card.misses > 0).length;
  const totalHits = flashcards.reduce((sum, card) => sum + card.hits, 0);
  const totalAttempts = flashcards.reduce((sum, card) => sum + card.hits + card.misses, 0);
  const accuracy = totalAttempts > 0 ? Math.round((totalHits / totalAttempts) * 100) : 0;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Métricas de Estudio</h2>
      
      <div className={styles.grid}>
        <article className={styles.card}>
          <span className={styles.label}>Racha Actual</span>
          <p className={styles.value}>{streak}</p>
          <p className={styles.subtext}>días seguidos</p>
        </article>

        <article className={styles.card}>
          <span className={styles.label}>Tarjetas Estudiadas</span>
          <p className={styles.value}>{totalStudied}</p>
          <p className={styles.subtext}>de {flashcards.length} en tu mazo</p>
        </article>

        <article className={styles.card}>
          <span className={styles.label}>Efectividad</span>
          <p className={styles.value}>{accuracy}%</p>
          <p className={styles.subtext}>relación aciertos/errores</p>
        </article>
      </div>
    </section>
  );
};