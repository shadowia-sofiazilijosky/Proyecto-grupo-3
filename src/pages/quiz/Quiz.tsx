import { useState } from "react";
import { useFlashcardStore } from "../../features/flashcards/store";
import style from "./quiz.module.css";

const Quiz = () => {
    const flashcards = useFlashcardStore((s) => s.flashcards);

    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    if (flashcards.length < 4) {
        return <p>Necesitás al menos 4 tarjetas 😅</p>;
    }

    const current = flashcards[index];

    // 🔹 Generar opciones dinámicas
    const generateOptions = () => {
        const answers = flashcards.map((c) => c.answer);
        const incorrect = answers.filter((a) => a !== current.answer);

        const shuffled = incorrect.sort(() => Math.random() - 0.5);

        // 🔥 cantidad de opciones
        const totalOptions = flashcards.length >= 4 ? 4 : 2;

        const options = [current.answer, ...shuffled.slice(0, totalOptions - 1)];

        return options.sort(() => Math.random() - 0.5);
    };

    const options = generateOptions();

    const handleSelect = (option: string) => {
        if (flipped) return;

        setSelected(option);
        setFlipped(true);

        if (option === current.answer) {
            setScore((prev) => prev + 1);
        }

        setTimeout(() => {
            const next = index + 1;

            if (next < flashcards.length) {
                setIndex(next);
                setFlipped(false);
                setSelected(null);
            } else {
                setFinished(true);
            }
        }, 1200);
    };

    // 🔹 FIN
    if (finished) {
        const porcentaje = Math.round((score / flashcards.length) * 100);

        return (
            <div className={style.container}>
                <h2>Resultado 🎯</h2>
                <p>{score} / {flashcards.length}</p>
                <h3>{porcentaje}%</h3>
            </div>
        );
    }

    return (
        <div className={style.container}>
            <h3>{index + 1} / {flashcards.length}</h3>

            {/* 🔹 CARD */}
            <div className={style.cardWrapper}>
                <div className={`${style.cardInner} ${flipped ? style.flipped : ""}`}>

                    <div className={`${style.cardFace} ${style.front}`}>
                        <h2>{current.question}</h2>
                    </div>

                    <div
                        className={`${style.cardFace} ${style.back} ${selected === current.answer ? style.correct : style.incorrect
                            }`}
                    >
                        <h2>{current.answer}</h2>
                    </div>

                </div>
            </div>

            {/* 🔹 OPCIONES */}
            {!flipped && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                        width: "400px",
                        marginTop: "10px"
                    }}
                >
                    {options.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => handleSelect(opt)}
                            className={style.optionButton}>
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Quiz;