import styles from "../../quiz.module.css";

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
    <div className={styles.glassCard}>
      {/* Contadores */}
      <div className={styles.counters}>
        <div className={styles.badgeHit}>✅ {hits}</div>
        <div className={styles.badgeMiss}>❌ {misses}</div>
      </div>
      
      {/* Título y Pregunta */}
      <div className={styles.sparkleWrapper}>✨</div>
      <h2 className={styles.questionText}>{question}</h2>

      {/* Grid de opciones */}
      <div className={styles.optionsContainer}>
        {options.map((opt, i) => {
          const isCorrect = opt === answer;
          const isSelected = opt === selected;
          
          let btnClass = styles.optionBtn;
          if (flipped) {
            if (isCorrect) btnClass += ` ${styles.correctOption}`;
            else if (isSelected) btnClass += ` ${styles.incorrectOption}`;
          }

          return (
            <button 
              key={i} 
              className={btnClass} 
              onClick={() => handleSelect(opt)} 
              disabled={flipped}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;