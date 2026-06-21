import { useState, useEffect, useMemo } from "react";
import { useFlashcardStore } from "../../features/flashcards/store";
import styles from "./studycards.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import StudyMain from "./components/studymain/StudyMain";

const StudyCards = () => {
  const flashcards = useFlashcardStore((s) => s.flashcards);
  const markAsStudied = useFlashcardStore((s: any) => s.markAsStudied);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // --- NUEVA LÓGICA DE FILTROS ---
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");

  const filteredCards = useMemo(() => {
    if (filterType === "all") return flashcards;
    if (filterType === "difficulty") return flashcards.filter(c => c.difficulty === filterValue);
    // Usamos 'topic' como definiste en tu type.ts
    if (filterType === "materia") return flashcards.filter(c => c.topic === filterValue);
    return flashcards;
  }, [flashcards, filterType, filterValue]);

  const materiasUnicas = useMemo(() => {
    // Usamos 'topic' para extraer los temas únicos
    const list = flashcards.map(c => c.topic).filter(t => t && t !== "");
    return Array.from(new Set(list)).sort();
  }, [flashcards]);
  // --------------------------------

  useEffect(() => {
    setCurrentIndex(0);
    setIsAnswerVisible(false);
  }, [filterType, filterValue]); // Se actualiza cuando cambian los filtros

  const card = filteredCards[currentIndex];
  const hasCards = filteredCards.length > 0;

  const handleClick = () => {
    if (!isAnswerVisible) {
      setIsAnswerVisible(true);
      if (card) {
        markAsStudied(card.id);
      }
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

const toggleMenu = () => {
  setMenuOpen(prev => !prev);
};

  return (
    <>
      <button className={styles.menuButton}
      onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <div className={styles.layout}>
        <Sidebar
          // --- PASAMOS LOS NUEVOS FILTROS ---
          filterType={filterType}
          setFilterType={setFilterType}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          materiasUnicas={materiasUnicas}
          // ----------------------------------
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
          onMenuClick={toggleMenu}
          filter={filterValue} // Usamos el valor actual
        />
      </div>
    </>
  );
};

export default StudyCards; 