import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Flashcard } from "./types";

interface FlashcardState {
  flashcards: Flashcard[];
  
  // Novedades para el Desafío 5 (Rachas)
  streak: number;
  lastStudyDate: string | null;

  // CRUD
  addFlashcard: (card: Omit<Flashcard, "id">) => void;
  updateFlashcard: (id: string, updates: Partial<Omit<Flashcard, "id">>) => void;
  removeFlashcard: (id: string) => void;
  recordResult: (id: string, isCorrect: boolean) => void;
  
  // Función para tu desafío
  updateStreak: (newStreak: number, date: string) => void;
}

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    (set) => ({
      flashcards: [],
      
      // Valores iniciales de tus variables
      streak: 0,
      lastStudyDate: null,

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
        set((state)=> ({
          flashcards: state.flashcards.map((card)=>{
            if(card.id === id)
              return {
                ...card,
                hits: isCorrect ? card.hits + 1 : card.hits,
                misses: isCorrect ? card.misses : card.misses + 1
              }
            return card
          })
        })),

      // La función que guarda la racha
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