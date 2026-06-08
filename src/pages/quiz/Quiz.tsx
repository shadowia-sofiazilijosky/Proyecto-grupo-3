import { useState, useEffect } from "react";
import { useFlashcardStore } from "../../features/flashcards/store";
import style from "./quiz.module.css";

const Quiz = () => {
    const flashcards = useFlashcardStore((s) => s.flashcards);
    const registrarResultado = useFlashcardStore((s) => s.registrarResultado);

    type Answer = {
        question: string;
        correctAnswer: string;
        userAnswer: string;
        isCorrect: boolean;
    };
    const resetQuiz = () => {
        setIndex(0);
        setFlipped(false);
        setSelected(null);
        setScore(0);
        setFinished(false);
        setAnswers([]);
        setShowReview(false);
    };
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [options, setOptions] = useState<string[]>([]);

    const current = flashcards[index];

    useEffect(() => {
        if (!current) return;

        const newOptions = generateOptions();
        setOptions(newOptions);
    }, [current]);

    if (flashcards.length < 4) {
        return <p>Necesitás al menos 4 tarjetas 😅</p>;
    }
    if (showReview) {
        return (
            <div className={style.container}>
                <div className={style.resultBox}>

                    <h2>Revisión de respuestas 📋</h2>

                    <div className={style.reviewList}>
                        {answers.map((item, i) => (
                            <div
                                key={i}
                                className={`${style.reviewItem} ${item.isCorrect ? style.correctItem : style.incorrectItem
                                    }`}
                            >
                                <p><strong>{i + 1}. {item.question}</strong></p>

                                <p>
                                    Tu respuesta: {item.userAnswer}
                                </p>

                                {!item.isCorrect && (
                                    <p>
                                        Correcta: {item.correctAnswer}
                                    </p>
                                )}

                                {item.isCorrect && <span>✅ Correcto</span>}
                                {!item.isCorrect && <span>❌ Incorrecto</span>}
                            </div>
                        ))}
                    </div>
                    <button className={style.primary} onClick={() => setShowReview(false)}>
                        Volver ⬅
                    </button>

                </div>
            </div>
        );

    };

    // 🔹 Generar opciones dinámicas
    const generateOptions = () => {
        const answers = flashcards.map((c) => c.answer);
        const incorrect = answers.filter((a) => a !== current.answer);

        const shuffled = [...incorrect].sort(() => Math.random() - 0.5);

        // 🔥 cantidad de opciones
        const totalOptions = flashcards.length >= 4 ? 4 : 2;

        const options = [current.answer, ...shuffled.slice(0, totalOptions - 1)];

        return options.sort(() => Math.random() - 0.5);
    };
const handleSelect = (option: string) => {
    if (flipped) return;

    const isCorrect = option === current.answer;

    setSelected(option);
    setFlipped(true);

    if (isCorrect) {
        setScore((prev) => prev + 1);
    }

    // ✅ CONEXIÓN CON D3
    registrarResultado(current.id, isCorrect);

    setAnswers((prev) => [
        ...prev,
        {
            question: current.question,
            correctAnswer: current.answer,
            userAnswer: option,
            isCorrect: isCorrect,
        },
    ]);

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
        const getColor = () => {
            if (porcentaje >= 60) {
                const ratio = (porcentaje - 60) / 40;
                return `hsl(${120 - (1 - ratio) * 40}, 70%, 75%)`;
            } else {
                const ratio = porcentaje / 60;
                return `hsl(${0 + ratio * 40}, 70%, 75%)`;
            }
        };
        return (
            <div className={style.container}>
                <div className={style.main}>

                    {/* 🔥 HEADER FUERA */}
                    <div className={style.header}>
                        <h1>Quiz🧠</h1>
                        <p>
                            Estos quiz son para practicar tu memoria y ver cómo te va recordando
                            las flashcards.
                        </p>
                    </div>

                    {/* 🔥 SOLO el resultado adentro */}
                    <div
                        className={style.resultBox}
                        style={{
                            background: `linear-gradient(135deg, #ffffff, ${getColor()})`
                        }}
                    >

                        <div className={style.resultContent}>
                            <h2>Resultado 🎯</h2>

                            <div className={style.resultGrid}>
                                <div>
                                    <p>Progreso</p>
                                    <h3>{flashcards.length} / {flashcards.length}</h3>
                                </div>

                                <div>
                                    <p>Puntos</p>
                                    <h3>{score} / {flashcards.length}</h3>
                                </div>

                                <div className={style.fullWidth}>
                                    <p>Porcentaje</p>
                                    <h1>{porcentaje}%</h1>
                                </div>
                            </div>
                        </div>

                        <div className={style.resultButtons}>
                            <button className={style.primary} onClick={() => setShowReview(true)}>
                                Ver respuestas 👀
                            </button>

                            <button className={style.secondary} onClick={resetQuiz}>
                                Reintentar 🔁
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className={style.container}>

            <div className={style.main}> {/* 🔥 NUEVO */}

                {/* 🔹 HEADER */}
                <div className={style.header}>
                    <h1>Quiz🧠</h1>
                    <p>
                        Poné a prueba cuánto recordás de lo que estudiaste ✨ Este quiz mezcla tus flashcards
                        para desafiar tu memoria y ayudarte a reforzar lo aprendido de manera dinámica.
                    </p>
                    <p>¡Elegí con cuidado y descubrí qué tan afilada está tu mente! 🧠💡</p>
                </div>

                <h3>{index + 1} / {flashcards.length}</h3>

                {/* 🔹 CARD */}
                <div className={style.cardWrapper}>
                    <div className={`${style.cardInner} ${flipped ? style.flipped : ""}`}>

                        <div className={`${style.cardFace} ${style.front}`}>
                            <h2>{current.question}</h2>

                            <div className={style.optionsContainer}>
                                {options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(opt)}
                                        className={style.optionButton}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div
                            className={`${style.cardFace} ${style.back} ${selected === current.answer ? style.correct : style.incorrect
                                }`}
                        >
                            <h2>{current.answer}</h2>
                        </div>

                    </div>
                </div>

            </div> {/* 🔥 NUEVO */}
        </div>
    );
}
export default Quiz;