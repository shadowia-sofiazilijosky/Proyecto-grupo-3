import styles from "../../../../pages/flashcards/studycards.module.css";
import difficulties from "../../../../shared/design/difficulty.module.css";
import sidebar from "./sidebar.module.css";

type Props = {
  filterType: string;
  setFilterType: (val: string) => void;
  filterValue: string;
  setFilterValue: (val: string) => void;
  materiasUnicas: string[];
  filteredCards: any[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  setShowAnswer: (val: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (val: boolean) => void;
};

const Sidebar = ({
  filterType,
  setFilterType,
  filterValue,
  setFilterValue,
  materiasUnicas,
  filteredCards,
  currentIndex,
  setCurrentIndex,
  setShowAnswer,
  menuOpen,
  setMenuOpen,
}: Props) => {

  // Función interna para normalizar solo durante el filtrado de la lista
  const normalize = (str: string) => 
    str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Creamos una lista limpia de tópicos únicos para el select
  const uniqueNormalizedTopics = Array.from(
    new Set(materiasUnicas.map(topic => normalize(topic)))
  ).sort((a, b) => a.localeCompare(b));

  return (
    <aside className={`${sidebar.sidebar} ${menuOpen ? sidebar.open : ""}`}>
      
      <div className={sidebar.header}>
        <h2 className={sidebar.filterTitle}>Filtrar</h2>
        <button 
          className={sidebar.toggleBtn} 
          onClick={() => setMenuOpen(false)}
          title="Cerrar barra lateral"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
        </button>
      </div>

      <label htmlFor="tipo-filtro" className={sidebar.label}>Dividido por:</label>
      <select
        id="tipo-filtro"
        className={sidebar.select}
        value={filterType}
        onChange={(e) => {
          setFilterType(e.target.value);
          setFilterValue(""); 
        }}
      >
        <option value="all">Todas</option>
        <option value="difficulty">Dificultad</option>
        <option value="materia">Materia</option>
      </select>

      {filterType === "difficulty" && (
        <>
          <label htmlFor="valor-filtro" className={sidebar.label}>Dificultad:</label>
          <select
            id="valor-filtro"
            className={sidebar.select}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="">Selecciona una dificultad...</option>
            <option value="easy">Fácil</option>
            <option value="medium">Medio</option>
            <option value="hard">Difícil</option>
          </select>
        </>
      )}

      {filterType === "materia" && (
        <>
          <label htmlFor="valor-filtro" className={sidebar.label}>Materia:</label>
          <select
            id="valor-filtro"
            className={sidebar.select}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="">Selecciona un tema...</option>
            {uniqueNormalizedTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic.charAt(0).toUpperCase() + topic.slice(1)}
              </option>
            ))}
          </select>
        </>
      )}

      <div className={sidebar.list}>
        {filteredCards.map((c, i) => (
          <div
            key={i}
            className={`
              ${sidebar.listItem} 
              ${difficulties[c.difficulty]} 
              ${i === currentIndex ? styles.active : ""}
            `}
            onClick={() => {
              setCurrentIndex(i);
              setShowAnswer(false);
              if (window.innerWidth <= 1024) setMenuOpen(false);
            }}
          >
            {c.question}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;