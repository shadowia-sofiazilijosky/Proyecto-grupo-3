import style from "../../../../pages/flashcards/studycards.module.css";

type Props = {
  hasCards: boolean;
  index: number;
  total: number;
  card: any;
  showAnswer: boolean;
  handleClick: () => void;
  filter: string;
};

const StudyMain = ({
  hasCards,
  index,
  total,
  card,
  showAnswer,
  handleClick,
  filter
}: Props) => {
  return (
    <main className={style.main}>
      <h2>Modo Estudio</h2>

      {hasCards ? (
        <>
          <p>
            {index + 1} / {total}
          </p>

          <div className={style.cardWrapper} onClick={handleClick}>
            <div
              className={`${style.cardInner} ${
                showAnswer ? style.flipped : ""
              }`}
            >
              <div className={`${style.cardFace} ${style.front}`}>
                {card.question}
              </div>

              <div
                className={`${style.cardFace} ${style.back} ${style[filter]}`}
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
        <div className={style.emptyBox}>
          <h3>No hay tarjetas</h3>
          <p>para este nivel 😥</p>
        </div>
      )}
    </main>
  );
};

export default StudyMain;