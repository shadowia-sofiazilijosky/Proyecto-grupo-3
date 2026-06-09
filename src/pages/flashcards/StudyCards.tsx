import { useState, useEffect } from "react";
import { useFlashcardStore } from "../../features/flashcards/store";
import styles from "../../../../pages/flashcards/studycards.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import StudyMain from "./components/studymain/StudyMain";

const StudyCards = () => {
  const flashcards = useFlashcardStore((s) => s.flashcards);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [filter, setFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredCards =
    filter === "all"
      ? flashcards
      : flashcards.filter((card) => card.difficulty === filter);

  useEffect(() => {
    setCurrentIndex(0);
    setIsAnswerVisible(false);
  }, [filter]);

  const card = filteredCards[currentIndex];
  const hasCards = filteredCards.length > 0;

  const handleClick = () => {
    if (!isAnswerVisible) {
      setIsAnswerVisible(true);
    } else {
      setCurrentIndex((prev) => {
  if (prev < filteredCards.length - 1) {
    return prev + 1;
  }
  return 0;
});
      setIsAnswerVisible(false);
    }
  };

  return (
    <>
      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div className={styles.layout}>
        <Sidebar
          filter={filter}
          setFilter={setFilter}
          filteredCards={filteredCards}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setShowAnswer={setIsAnswerVisible}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        <StudyMain
          hasCards={hasCards}
          currentIndex={currentIndex}
          total={filteredCards.length}
          card={card}
          showAnswer={isAnswerVisible}
          handleClick={handleClick}
          filter={filter}
        />
      </div>
    </>
  );
};

export default StudyCards;