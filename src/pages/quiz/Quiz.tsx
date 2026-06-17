import { useState, useEffect, useMemo } from "react";
import { useFlashcardStore } from "../../features/flashcards/store";
import { getPrioritizedCards } from "../../features/flashcards/utils";
import styles from "./quiz.module.css";

import Header from "./components/header/Header";
import QuestionCard from "./components/question/QuestionCard";
import Result from "./components/result/Result";
import Review from "./components/review/Review";

type Answer = {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
  hits: number;
  misses: number;
};

const Quiz = () => {
  const allFlashcards = useFlashcardStore((s) => s.flashcards);
  const recordResult = useFlashcardStore((s) => s.recordResult);
  //Estado para saber cunado recalcular el mazo si el usuario reinicia
  const [sessionAttempt, setSessionAttempt] = useState(0);

  // useMemo congela el array ordenado para que no parpadee al responder.
  // solo vuelve a ejecutar el algoritmo si sessionAttempt cambia.
  const flashcards = useMemo(() => {
    return getPrioritizedCards(allFlashcards);
  }, [sessionAttempt]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  const currentFlashcard = flashcards[currentIndex];

  useEffect(() => {
    if (!currentFlashcard) return;
    const newOptions = generateOptions();
    setOptions(newOptions);
  }, [currentFlashcard]);

  const generateOptions = () => {
    const allAnswers = flashcards.map((c) => c.answer);
    const incorrect = allAnswers.filter((a) => a !== currentFlashcard.answer);
    const shuffled = [...incorrect].sort(() => Math.random() - 0.5);

    const totalOptions = flashcards.length >= 4 ? 4 : 2;

    const options = [currentFlashcard.answer, ...shuffled.slice(0, totalOptions - 1)];
    return options.sort(() => Math.random() - 0.5);
  };

  const handleOptionSelect = (option: string) => {
    if (flipped) return;

    const isCorrect = option === currentFlashcard.answer;

    setSelectedOption(option);
    setFlipped(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    recordResult(currentFlashcard.id, isCorrect);

    setUserAnswers((prev) => [
      ...prev,
      {
        question: currentFlashcard.question,
        correctAnswer: currentFlashcard.answer,
        userAnswer: option,
        isCorrect,
        hits: currentFlashcard.hits,
        misses: currentFlashcard.misses,
      },
    ]);

    setTimeout(() => {
      const next = currentIndex + 1;
      if (next < flashcards.length) {
        setCurrentIndex(next);
        setFlipped(false);
        setSelectedOption(null);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  if (flashcards.length < 4) {
    return <p>Necesitás al menos 4 tarjetas 😅</p>;
  }

  if (showReview) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Review
          answers={userAnswers}
          onBack={() => setShowReview(false)}
        />
      </div>
    </div>
  );
}

if (finished) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Result
          score={score}
          total={flashcards.length}
          onReview={() => setShowReview(true)}
          onRetry={() => {
            setCurrentIndex(0);
            setFlipped(false);
            setSelectedOption(null);
            setScore(0);
            setFinished(false);
            setUserAnswers([]);
            setShowReview(false);
            setSessionAttempt((prev) => prev + 1); // Esto hará que se recalcule el mazo y se mezclen las tarjetas para la próxima ronda.
          }}
        />
      </div>
    </div>
  );
}
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Header />

        <p className={styles.progress}>
          {currentIndex + 1} / {flashcards.length}
        </p>

        <QuestionCard
          question={currentFlashcard.question}
          answer={currentFlashcard.answer}
          flipped={flipped}
          selected={selectedOption}
          options={options}
          handleSelect={handleOptionSelect}
          hits={currentFlashcard.hits}
          misses={currentFlashcard.misses}
        />
      </div>
    </div>
  );
};

export default Quiz;