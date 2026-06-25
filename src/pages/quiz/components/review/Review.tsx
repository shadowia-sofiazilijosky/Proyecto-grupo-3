import review from "./review.module.css";

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
    <div className={review.reviewCard}>
      <h2 className={review.title}>Revisión de respuestas</h2>
      
      <div className={review.answersList}>
        {answers.map((item, i) => (
          <div 
            key={i} 
            className={`${review.bubble} ${item.isCorrect ? review.correct : review.incorrect}`}
          >
            <p className={review.question}>{i + 1}. {item.question}</p>
            
            <div className={review.details}>
              <p>Tu respuesta: <strong>{item.userAnswer}</strong></p>
              {!item.isCorrect && (
                <p>Correcta: <strong>{item.correctAnswer}</strong></p>
              )}
            </div>

            <span className={review.status}>
              {item.isCorrect ? "✅ Correcto" : "❌ Incorrecto"}
            </span>
          </div>
        ))}
      </div>

      <button className={review.backBtn} onClick={onBack}>
        Volver atrás ⬅
      </button>
    </div>
  );
};

export default Review;