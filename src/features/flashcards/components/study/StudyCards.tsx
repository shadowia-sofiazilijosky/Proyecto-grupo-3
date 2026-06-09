import { useState, useEffect } from "react";
import { useFlashcardStore } from "../../../../features/flashcards/store";
import style from "../../../../pages/flashcards/studycards.module.css";
import Sidebar from "./Sidebar";
import StudyMain from "./StudyMain";

const StudyCards = () => {
  const flashcards = useFlashcardStore((s) => s.flashcards);

  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [filter, setFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredCards =
    filter === "all"
      ? flashcards
      : flashcards.filter((card) => card.difficulty === filter);

  useEffect(() => {
    setIndex(0);
    setShowAnswer(false);
  }, [filter]);

  const card = filteredCards[index];
  const hasCards = filteredCards.length > 0;

  const handleClick = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    } else {
      setIndex((prev) => (prev + 1) % filteredCards.length);
      setShowAnswer(false);
    }
  };

  return (
    <>
      <button
        className={style.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div className={style.layout}>
        <Sidebar
          filter={filter}
          setFilter={setFilter}
          filteredCards={filteredCards}
          index={index}
          setIndex={setIndex}
          setShowAnswer={setShowAnswer}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        <StudyMain
          hasCards={hasCards}
          index={index}
          total={filteredCards.length}
          card={card}
          showAnswer={showAnswer}
          handleClick={handleClick}
          filter={filter}
        />
      </div>
    </>
  );
};

export default StudyCards;