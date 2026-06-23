import { useEffect } from "react";
// Ruta corregida y uso de 'type' para cumplir con verbatimModuleSyntax
import { useFlashcardStore, type FlashcardState } from "../../../../features/flashcards/store"; 
import styles from "./result.module.css";

type Props = {
  score: number;
  total: number;
  onReview: () => void;
  onRetry: () => void;
};

const Result = ({ score, total, onReview, onRetry }: Props) => {
  // Ahora TypeScript conoce el tipo FlashcardState y evita errores de 'any'
  const addResult = useFlashcardStore((s: FlashcardState) => s.addResult);
  const percentage = Math.round((score / total) * 100);

  // Guardamos el resultado automáticamente cuando se monta este componente
  useEffect(() => {
    addResult(score, total);
  }, [score, total, addResult]);

  return (
    <div className={styles.resultCard}>
      <h2 className={styles.title}>¡Resultado Final!</h2>
      
      <div className={styles.statsGrid}>
        <div className={styles.statBox}>
          <span>Progreso</span>
          <strong>{total} / {total}</strong>
        </div>
        <div className={styles.statBox}>
          <span>Puntos</span>
          <strong>{score} / {total}</strong>
        </div>
      </div>

      <div className={styles.percentageBox}>
        <p>Tu efectividad</p>
        <strong>{percentage}%</strong>
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.reviewBtn} onClick={onReview}>Ver respuestas</button>
        <button className={styles.retryBtn} onClick={onRetry}>Reintentar</button>
      </div>
    </div>
  );
};

export default Result;