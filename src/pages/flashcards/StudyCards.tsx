import { useState } from "react";
import { useFlashcardStore } from "../../features/flashcards/store";
import style from "./studycards.module.css";

const StudyCards = () => {
    const flashcards = useFlashcardStore((s) => s.flashcards);

    const [index, setIndex] = useState(0);
    const [mostrarRespuesta, setMostrarRespuesta] = useState(false);

    if (flashcards.length === 0) {
        return <p>No hay flashcards todavía.</p>;
    }

    const card = flashcards[index];

    const handleClick = () => {
        if (!mostrarRespuesta) {
            setMostrarRespuesta(true);
        } else {
            setIndex((prev) => (prev + 1) % flashcards.length);
            setMostrarRespuesta(false);
        }
    };

    return (
        <div className={style.container}>
            <h2>Modo Estudio</h2>

            <p>{index + 1} / {flashcards.length}</p>

            <div className={style.cardWrapper} onClick={handleClick}>
                <div
                    className={`${style.cardInner} ${
                        mostrarRespuesta ? style.flipped : ""
                    }`}
                >
                    {/* CARA FRONTAL */}
                    <div className={`${style.cardFace} ${style.front}`}>
                        {card.question}
                    </div>

                    {/* CARA TRASERA */}
                    <div className={`${style.cardFace} ${style.back}`}>
                        {card.answer}
                    </div>
                </div>
            </div>

            <p>
                {mostrarRespuesta
                    ? "Click para siguiente"
                    : "Pensá la respuesta y hacé click"}
            </p>
        </div>
    );
};

export default StudyCards;