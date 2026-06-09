import style from "../../../../pages/flashcards/studycards.module.css";

type Props = {
  filter: string;
  setFilter: (val: string) => void;
  filteredCards: any[];
  index: number;
  setIndex: (i: number) => void;
  setShowAnswer: (val: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (val: boolean) => void;
};

const Sidebar = ({
  filter,
  setFilter,
  filteredCards,
  index,
  setIndex,
  setShowAnswer,
  menuOpen,
  setMenuOpen
}: Props) => {
  return (
    <aside className={`${style.sidebar} ${menuOpen ? style.open : ""}`}>
      <h3>Filtrar</h3>

      <select
        className={style[filter]}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">Todas</option>
        <option value="easy">Fácil</option>
        <option value="medium">Medio</option>
        <option value="hard">Difícil</option>
      </select>

      <div className={style.list}>
        {filteredCards.map((c, i) => (
          <div
            key={i}
            className={`
              ${style.listItem}
              ${style[c.difficulty]}
              ${i === index ? style.active : ""}
            `}
            onClick={() => {
              setIndex(i);
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
