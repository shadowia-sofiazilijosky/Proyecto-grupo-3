import { useState, useEffect } from "react";
import { useFlashcardStore } from "../../features/flashcards/store";
import style from "./studycards.module.css";

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

    return (<>
        <button
            className={style.menuButton}
            onClick={() => setMenuOpen(!menuOpen)}
        >
            ☰
        </button>
        <div className={style.layout}>
            {/* 🔹 IZQUIERDA */}
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

                {/* Lista de tarjetas */}
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
                                setShowAnswer(false);
                                setMenuOpen(false); // 🔥 esto lo cierra
                            }}
                        >
                            {c.question}
                        </div>
                    ))}
                </div>
            </aside>

            {/* 🔹 DERECHA */}
            <main className={style.main}>
                <h2>Modo Estudio</h2>

                {hasCards ? (
                    <>
                        <p>{index + 1} / {filteredCards.length}</p>

                        <div className={style.cardWrapper} onClick={handleClick}>
                            <div
                                className={`${style.cardInner} ${showAnswer ? style.flipped : ""
                                    }`}
                            >
                                <div className={`${style.cardFace} ${style.front}`}>
                                    {card.question}
                                </div>

                                <div className={`${style.cardFace} ${style.back}`}>
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
        </div>
    </>
    );
};

export default StudyCards;