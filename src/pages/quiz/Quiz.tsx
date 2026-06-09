import { useState, useEffect } from "react";
import { useFlashcardStore } from "../../features/flashcards/store";
import styles from "./quiz.module.css";

import Header from "./Header";
import QuestionCard from "./QuestionCard";
import Result from "./Result";
import Review from "./Review";

type Answer = {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
};

const Quiz = () => {
  const flashcards = useFlashcardStore((s) => s.flashcards);
  const recordResult = useFlashcardStore((s) => s.recordResult);

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
    return <Review answers={userAnswers} onBack={() => setShowReview(false)} />;
  }

  if (finished) {
    return (
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
        }}
      />
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
        />
      </div>
    </div>
  );
};

export default Quiz;