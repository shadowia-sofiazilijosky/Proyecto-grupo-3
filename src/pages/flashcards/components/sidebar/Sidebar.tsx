import styles from "../../../../pages/flashcards/studycards.module.css";
import difficulties from "../../../../shared/styles/difficulty.module.css"
import sidebar from "../../../../pages/flashcards/sidebar.module.css";
type Props = {
  filter: string;
  setFilter: (val: string) => void;
  filteredCards: any[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  setShowAnswer: (val: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (val: boolean) => void;
};

const Sidebar = ({
  filter,
  setFilter,
  filteredCards,
  currentIndex,
  setCurrentIndex,
  setShowAnswer,
  menuOpen,
  setMenuOpen
}: Props) => {
  return (
    <aside className={`${sidebar.sidebar} ${menuOpen ? sidebar.open : ""}`}>
      <h3>Filtrar</h3>

      <select
        className={difficulties[filter]}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">Todas</option>
        <option value="easy">Fácil</option>
        <option value="medium">Medio</option>
        <option value="hard">Difícil</option>
      </select>

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
              setShowAnswer(false); // ✅ igual que tu código
              setMenuOpen(false);   // ✅ mobile
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
