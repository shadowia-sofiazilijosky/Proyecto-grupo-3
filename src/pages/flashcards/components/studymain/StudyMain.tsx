import styles from "../../../../pages/flashcards/studycards.module.css";
import cardStyles from "../../../../shared/styles/card.module.css";
type Props = {
  hasCards: boolean;
  currentIndex: number;
  total: number;
  card: any;
  showAnswer: boolean;
  handleClick: () => void;
  filter: string;
};

const StudyMain = ({
  hasCards,
  currentIndex,
  total,
  card,
  showAnswer,
  handleClick,
  filter
}: Props) => {
  return (
    <main className={styles.main}>
      <h2>Modo Estudio</h2>

      {hasCards ? (
        <>
          <p>
            {currentIndex + 1} / {total}
          </p>

          <div className={`${cardStyles.cardWrapper} ${cardStyles.cardSizeDefault} ${cardStyles.cardStudyMobile}`}
            onClick={handleClick}>
            <div
              className={`${cardStyles.cardInner} ${showAnswer ? cardStyles.flipped : ""
                }`}
            >
              <div className={`${cardStyles.cardFace} ${cardStyles.front} ${styles.front}`}>
                {card.question}
              </div>

              <div
                className={`${cardStyles.cardFace} ${cardStyles.back} ${styles.back} ${styles[filter]}`}
              >
                {card.answer}
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
          <h3>No hay tarjetas</h3>
          <p>para este nivel 😥</p>
        </div>
      )}
    </main>
  );
};

export default StudyMain;