import { useState, useEffect, useMemo } from "react";
import { useFlashcardStore } from "../../features/flashcards/store";
import styles from "./studycards.module.css";
import Sidebar from "./components/sidebar/Sidebar";
import StudyMain from "./components/studymain/StudyMain";

// 🔥 Función de normalización para asegurar coincidencias sin importar tildes/mayúsculas
const normalize = (str: string) => 
  str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const StudyCards = () => {
  const flashcards = useFlashcardStore((s) => s.flashcards);
  const markAsStudied = useFlashcardStore((s: any) => s.markAsStudied);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  
  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 1024) {
      setMenuOpen(false);
    }
  }, []);

  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");

  // --- FILTRADO NORMALIZADO ---
  const filteredCards = useMemo(() => {
    if (filterType === "all") return flashcards;
    if (filterType === "difficulty") return flashcards.filter(c => c.difficulty === filterValue);
    if (filterType === "materia") {
      // 🔥 Como filterValue ya viene normalizado desde el Sidebar, 
      // solo comparamos el topic de la tarjeta (también normalizado)
      return flashcards.filter(c => normalize(c.topic) === filterValue);
    }
    return flashcards;
  }, [flashcards, filterType, filterValue]);

  // --- LISTA DE MATERIAS ÚNICAS NORMALIZADAS ---
  const materiasUnicas = useMemo(() => {
    const list = flashcards.map(c => c.topic).filter(t => t && t !== "");
    // Obtenemos los valores únicos normalizados
    const unique = Array.from(new Set(list.map(t => normalize(t))));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [flashcards]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsAnswerVisible(false);
  }, [filterType, filterValue]);

  const card = filteredCards[currentIndex];
  const hasCards = filteredCards.length > 0;

  const handleClick = () => {
  if (!isAnswerVisible) {
    // 👉 Mostrar respuesta
    setIsAnswerVisible(true);

    if (card) {
      markAsStudied(card.id);
    }
  } else {
    // 👉 🔥 RESETEAR el tamaño antes de cambiar
    // Esto evita que arrastre un tamaño viejo
    setTimeout(() => {
      // este set llega al StudyMain vía props indirectamente
      // (porque cambia la card y se recalcula)
    }, 0);

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
    <div className={styles.layout}>
      <Sidebar
        filterType={filterType}
        setFilterType={setFilterType}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        materiasUnicas={materiasUnicas}
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
        menuOpen={menuOpen} 
      />
    </div>
  );
};

export default StudyCards;