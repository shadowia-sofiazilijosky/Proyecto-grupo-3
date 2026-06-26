import { useMemo } from "react";
import styles from "../../../../pages/flashcards/studycards.module.css";

type Props = {
  hasCards: boolean;
  currentIndex: number;
  total: number;
  card: any;
  showAnswer: boolean;
  handleClick: () => void;
  onMenuClick: () => void;
  menuOpen?: boolean;
};

const StudyMain = ({
  hasCards,
  currentIndex,
  total,
  card,
  showAnswer,
  handleClick,
  onMenuClick,
  menuOpen
}: Props) => {

  const pastelColors = ["#fecaca", "#fde68a", "#bbf7d0", "#bfdbfe", "#ddd6fe", "#fbcfe8", "#c7d2fe"];

  const randomColor = useMemo(() => {
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  }, [currentIndex]);

  return (
    <main className={styles.main}>
      
      {!menuOpen && (
        <div className={styles.buttonContainer}>
          <button 
            className={styles.menuButton} 
            onClick={(e) => { e.stopPropagation(); onMenuClick(); }}
            title="Abrir barra lateral"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </button>
        </div>
      )}

      <h2 className={styles.animatedTitle}>Modo Estudio</h2>

      {hasCards ? (
        <>
          {/* 🔥 AQUI HICE EL CAMBIO: cambié styles.counter por styles.counterPill */}
          <div className={styles.counterPill}>
            {currentIndex + 1} / {total}
          </div>

          <div className={styles.studyContainer}>
            <div className={`${styles.cardWrapper} ${styles.rainbowCard}`} onClick={handleClick}>
              <div className={`${styles.cardInner} ${showAnswer ? styles.flipped : ""}`}>
                
                <div className={`${styles.cardFace} ${styles.front} ${styles.cardQuestion}`}>
                  {card.question}
                </div>

                <div 
                  className={`${styles.cardFace} ${styles.back}`}
                  style={{ backgroundColor: showAnswer ? randomColor : "transparent" }}
                >
                  <div className={styles.answerContent}>
                    {card.answer}
                  </div>
                </div>

              </div>
            </div>
          </div>

          <p className={styles.hint}>
            {showAnswer ? "Click para la siguiente" : "Pensá la respuesta y hacé click"}
          </p>
        </>
      ) : (
        <div className={styles.emptyBox}>
          <h3>¡Ups!</h3>
          <p>No encontramos tarjetas para este filtro.</p>
          <p style={{ marginTop: "20px", fontSize: "0.9rem" }}>
            Probá cambiando el filtro o creá una nueva.
          </p>
        </div>
      )}
    </main>
  );
};

export default StudyMain;