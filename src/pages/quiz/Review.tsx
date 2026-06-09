import styles from "./quiz.module.css";

type Answer = {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
};

type Props = {
  answers: Answer[];
  onBack: () => void;
};

const Review = ({ answers, onBack }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.resultBox}>

          <h2>Revisión de respuestas 📋</h2>

          <div className={styles.reviewList}>
            {answers.map((item, i) => (
              <div
                key={i}>
                <p><strong>{i + 1}. {item.question}</strong></p>

                <p>Tu respuesta: {item.userAnswer}</p>

                {!item.isCorrect && (
                  <p>Correcta: {item.correctAnswer}</p>
                )}

                <p>
                  {item.isCorrect ? "✅ Correcto" : "❌ Incorrecto"}
                </p>
              </div>
            ))}
          </div>

          <button className={styles.primary} onClick={onBack}>
            Volver ⬅
          </button>

        </div>
      </div>
    </div>
  );
};

export default Review;