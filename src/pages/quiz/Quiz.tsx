import { useState, useEffect } from "react";
import { useFlashcardStore } from "../../features/flashcards/store";
import { getPrioritizedCards } from "../../features/flashcards/utils";
import styles from "./quiz.module.css";

import Header from "./components/header/Header";
import QuestionCard from "./components/question/QuestionCard";
import Result from "./components/result/Result";
import Review from "./components/review/Review";

const normalize = (str: string) => str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

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

  // --- MAZO FIJO PARA LA SESIÓN ---
  const [flashcards, setFlashcards] = useState<any[]>([]);

  useEffect(() => {
    // Solo cargamos el mazo una vez al montar el componente
    setFlashcards(getPrioritizedCards(allFlashcards));
  }, []); // El array vacío [] asegura que no se re-calcule al cambiar allFlashcards

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [sessionHits, setSessionHits] = useState(0);
  const [sessionMisses, setSessionMisses] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  const currentFlashcard = flashcards[currentIndex];

  useEffect(() => {
    if (!currentFlashcard) return;
    setOptions(generateOptions());
  }, [currentIndex, flashcards]); // Dependencia en currentIndex para que sepa cuándo cambiar

  const generateOptions = () => {
    if (!currentFlashcard) return [];
    const relatedCards = flashcards.filter(
      (c) => normalize(c.topic) === normalize(currentFlashcard.topic) && c.id !== currentFlashcard.id
    );
    let candidates = relatedCards.map((c) => c.answer);
    if (candidates.length < 3) {
      const others = flashcards
        .filter((c) => c.answer !== currentFlashcard.answer && !candidates.includes(c.answer))
        .map((c) => c.answer);
      candidates = [...candidates, ...others];
    }
    const incorrectOptions = [...new Set(candidates)].sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [currentFlashcard.answer, ...incorrectOptions];
    return options.sort(() => Math.random() - 0.5);
  };

  const handleOptionSelect = (option: string) => {
    if (flipped) return;
    const isCorrect = option === currentFlashcard.answer;
    setSelectedOption(option);
    setFlipped(true);
    
    if (isCorrect) { 
        setScore((prev) => prev + 1); 
        setSessionHits((prev) => prev + 1); 
    } else { 
        setSessionMisses((prev) => prev + 1); 
    }
    
    recordResult(currentFlashcard.id, isCorrect);
    
    setUserAnswers((prev) => [...prev, { 
        question: currentFlashcard.question, 
        correctAnswer: currentFlashcard.answer, 
        userAnswer: option, 
        isCorrect, 
        hits: currentFlashcard.hits, 
        misses: currentFlashcard.misses 
    }]);

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

  return (
    <div className={`${styles.container} ${finished || showReview ? styles.finished : ''}`}>
      <div className={styles.main}>
        
        {!finished && !showReview && <Header />}

        {flashcards.length > 0 && flashcards.length < 4 ? (
          <div className={styles.glassCard}>
            <h2 className={styles.title}>¡Ups!</h2>
            <p className={styles.instructionText}>Necesitás al menos 4 tarjetas para esta selección.</p>
          </div>
        ) : showReview ? (
          <Review answers={userAnswers} onBack={() => setShowReview(false)} />
        ) : finished ? (
          <Result 
            score={score} 
            total={flashcards.length} 
            onReview={() => setShowReview(true)} 
            onRetry={() => { 
              setCurrentIndex(0); setFlipped(false); setSelectedOption(null); setScore(0); 
              setSessionHits(0); setSessionMisses(0); setFinished(false); setUserAnswers([]); 
              setShowReview(false); 
            }} 
          />
        ) : currentFlashcard ? (
          <>
            <div className={styles.progressContainer}>
              <div className={styles.progressPill}>{currentIndex + 1} / {flashcards.length}</div>
            </div>
            <QuestionCard 
              question={currentFlashcard.question} 
              answer={currentFlashcard.answer} 
              flipped={flipped} 
              selected={selectedOption} 
              options={options} 
              handleSelect={handleOptionSelect} 
              hits={sessionHits} 
              misses={sessionMisses} 
            />
            <p className={styles.instructionText}>Seleccioná la respuesta correcta</p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Quiz;