export const DIFFICULTIES = [
  "easy",
  "medium",
  "hard",
] as const;

export type Difficulty =
  (typeof DIFFICULTIES)[number];

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: Difficulty;
  hits: number;
  misses: number;
  lastReview?: string; /* Sumamos esta línea para guardar la fecha */
}