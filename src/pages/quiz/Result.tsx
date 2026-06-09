import styles from "./quiz.module.css";
import result from "./result.module.css";
import button from "./button.module.css";
type Props = {
  score: number;
  total: number;
  onReview: () => void;
  onRetry: () => void;
};

const Result = ({ score, total, onReview, onRetry }: Props) => {
  const percentage = Math.round((score / total) * 100);

  const getColor = () => {
    if (percentage >= 60) {
      const ratio = (percentage - 60) / 40;
      return `hsl(${120 - (1 - ratio) * 40}, 70%, 75%)`;
    } else {
      const ratio = percentage / 60;
      return `hsl(${0 + ratio * 40}, 70%, 75%)`;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>

        {/* HEADER */}
        <div className={styles.header}>
          <h1>Quiz🧠</h1>
          <p>
            Estos quiz son para practicar tu memoria y ver cómo te va recordando
            las flashcards.
          </p>
        </div>

        {/* RESULT BOX */}
        <div
          className={result.resultBox}
          style={{
            background: `linear-gradient(135deg, #ffffff, ${getColor()})`
          }}
        >
          <div className={result.resultContent}>
            <h2>Resultado 🎯</h2>

            <div className={result.resultGrid}>
              <div>
                <p>Progreso</p>
                <h3>{total} / {total}</h3>
              </div>

              <div>
                <p>Puntos</p>
                <h3>{score} / {total}</h3>
              </div>

              <div className={result.fullWidth}>
                <p>Porcentaje</p>
                <h1>{percentage}%</h1>
              </div>
            </div>
          </div>

          <div className={result.resultButtons}>
            <button className={button.primary} onClick={onReview}>
              Ver respuestas 👀
            </button>

            <button className={button.secondary} onClick={onRetry}>
              Reintentar 🔁
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Result;