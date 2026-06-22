import styles from "../../quiz.module.css";
import OptionCard from "../optionCard/OptionCard";
type Props = {
  question: string;
  answer: string;
  flipped: boolean;
  selected: string | null;
  options: string[];
  handleSelect: (option: string) => void;
  hits?: number;
  misses?: number;
};
const QuestionCard = ({
  question,
  answer,
  flipped,
  selected,
  options,
  handleSelect,
  hits = 0,
  misses = 0,
}: Props) => {
  return (
    <>
      {/* ✅ CARD (pregunta) */}
      <div className={styles.flipCard}>

        <div className={`${styles.flipInner} ${flipped ? styles.flipped : ""}`}>

          {/* FRONT */}
          <div className={`${styles.flipFace} ${styles.flipFront}`}>

            {/* ✅ counters */}
            <div className={styles.counters}>
              <span className={styles.hitCount}>🟩 {hits}</span>
              <span className={styles.missCount}>🟥 {misses}</span>
            </div>

            <h2>{question}</h2>
          </div>

          {/* BACK */}
          <div
            className={`${styles.flipFace} ${styles.flipBack}
              ${flipped
                ? selected === answer
                  ? styles.correct
                  : styles.incorrect
                : ""
              }
            `}
          >
            <h2>{answer}</h2>
          </div>

        </div>
          {/* ✅ MEDIDOR (CLAVE) */}
  <div className={styles.questionSize}>
    <h2>{question}</h2>
    <h2>{answer}</h2>
  </div>
      </div>

      {/* ✅ 🔥 OPCIONES (AFUERA DE LA CARD) 🔥 */}
      <div className={styles.optionsContainer}>
        {options.map((opt, i) => (
          <OptionCard
            key={i}
            text={opt}
            isCorrect={opt === answer}
            isSelected={selected === opt}
            flipped={flipped}
            onClick={() => handleSelect(opt)}
          />
        ))}
      </div>
    </>
  );
};

export default QuestionCard;