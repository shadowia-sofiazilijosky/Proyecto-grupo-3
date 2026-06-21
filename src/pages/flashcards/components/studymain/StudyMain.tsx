import { useMemo } from "react"; // Necesitamos esto para que el color sea estable
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

  // Generamos un color aleatorio estable para esta tarjeta específica
  const pastelColors = [
    "#fecaca", "#fde68a", "#bbf7d0", "#bfdbfe", "#ddd6fe", "#fbcfe8", "#c7d2fe"
  ];

  const randomColor = useMemo(() => {
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  }, [currentIndex]);

  return (
    <main className={styles.main}>
      <h2>Modo Estudio</h2>

      {hasCards ? (
        <>
          <p>
            {currentIndex + 1} / {total}
          </div>

          <div className={styles.studyContainer}>

            {/* Botón arriba */}
            <div className={styles.buttonContainer}>
              <button
                className={styles.menuButton}
                onClick={handleClick}
              >
                ☰
              </button>
            </div>

            {/* Card */}
            <div className={styles.cardWrapper}>

              <div className={`${styles.card} ${showAnswer ? styles.flipped : ""}`}>

                <div className={`${styles.cardFace} ${styles.front}`}>
                  {card.question}
                </div>

                <div className={`${styles.cardFace} ${styles.back}`}>
                  {card.answer}
                </div>

              </div>

            </div>

          </div>
          <p>
            {showAnswer
              ? "Click para la siguiente"
              : "Pensá la respuesta y hacé click"}
          </p>
        </>
      ) : (
        <div className={styles.emptyBox}>
          <h3>¡Ups!</h3>
          <p>No encontramos tarjetas para este filtro.</p>
          <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>Probá cambiando el filtro o creá una nueva.</p>
        </div>
      )}
    </main>
  );
};

export default StudyMain;