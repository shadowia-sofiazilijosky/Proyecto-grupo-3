import { isToday, isYesterday, parseISO } from "date-fns";
import type { Flashcard } from "./types";

export const calculateNewStreak = (lastStudyDateStr: string | null, currentStreak: number): number => {
  // Si es la primera vez que estudia en su vida, la racha arranca en 1
  if (!lastStudyDateStr) {
    return 1;
  }

  const lastDate = parseISO(lastStudyDateStr);

  // Si ya estudió hoy y hace otra tarjeta, la racha se mantiene igual
  if (isToday(lastDate)) {
    return currentStreak;
  }

  // Si estudió ayer, ¡viene bien! La racha suma 1 día más
  if (isYesterday(lastDate)) {
    return currentStreak + 1;
  }

  // Si pasaron 2 o más días sin estudiar, se rompió la racha y vuelve a 1
  return 1;
};

export const getPrioritizedCards = (cards: Flashcard[]): Flashcard[] => {
  const difficultyMultiplier = {
    easy: 1,
    medium: 1.5,
    hard: 2,
  };
  return cards.toSorted((a, b) => {
    // calculamos el peso: mas errores = mayor prioridad.
    // La dificultad multiplica el peso del error.
    const weightA = (a.misses * difficultyMultiplier[a.difficulty]) - a.hits;
    const weightB = (b.misses * difficultyMultiplier[b.difficulty]) - b.hits;

    // Orden descendente (los de mayor peso van primero)
    return weightB - weightA;
  });
};
