import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Flashcard } from "./types";

export interface FlashcardState {
  flashcards: Flashcard[];
  
  // Novedades para el Desafío 5 (Rachas)
  streak: number;
  lastStudyDate: string | null;

  // NUEVO: Historial de resultados
  quizHistory: { score: number; total: number; date: string }[];
  addResult: (score: number, total: number) => void;

  // CRUD
  addFlashcard: (card: Omit<Flashcard, "id">) => void;
  updateFlashcard: (id: string, updates: Partial<Omit<Flashcard, "id">>) => void;
  removeFlashcard: (id: string) => void;
  
  // Para el Quiz
  recordResult: (id: string, isCorrect: boolean) => void;
  
  // NUEVO: Para el modo Estudiar
  markAsStudied: (id: string) => void; 
  
  // Función para tu desafío
  updateStreak: (newStreak: number, date: string) => void;
}

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    (set) => ({
      flashcards: [],
      streak: 0,
      lastStudyDate: null,
      quizHistory: [], // Inicializamos el historial vacío

      addResult: (score, total) =>
        set((state) => ({
          quizHistory: [
            ...state.quizHistory,
            { score, total, date: new Date().toISOString() }
          ]
        })),

      addFlashcard: (card) =>
        set((state) => ({
          flashcards: [
            ...state.flashcards,
            {
              ...card,
              id: Date.now().toString() 
            }
          ]
        })),

      updateFlashcard: (id, updates) =>
        set((state) => ({
          flashcards: state.flashcards.map((card) =>
            card.id === id ? { ...card, ...updates } : card
          ),
        })),

      removeFlashcard: (id) =>
        set((state) => ({
          flashcards: state.flashcards.filter((card) => card.id !== id),
        })),
        
      recordResult: (id, isCorrect) => 
        set((state) => ({
          flashcards: state.flashcards.map((card) => {
            if(card.id === id) {
              return {
                ...card,
                hits: isCorrect ? card.hits + 1 : card.hits,
                misses: isCorrect ? card.misses : card.misses + 1,
                lastReview: new Date().toISOString()
              }
            }
            return card
          })
        })),

      markAsStudied: (id) =>
        set((state) => ({
          flashcards: state.flashcards.map((card) => {
            if (card.id === id) {
              return {
                ...card,
                hits: card.hits + 1,
                lastReview: new Date().toISOString()
              };
            }
            return card;
          }),
        })),

      updateStreak: (newStreak, date) =>
        set(() => ({
          streak: newStreak,
          lastStudyDate: date,
        })),
    }),
    {
      name: "flashcard-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);