import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Flashcard } from "./types";

interface FlashcardState {
  flashcards: Flashcard[];

  // CRUD
  addFlashcard: (card: Omit<Flashcard, "id">) => void;
  updateFlashcard: (id: string, updates: Partial<Omit<Flashcard, "id">>) => void;
  removeFlashcard: (id: string) => void;
  registrarResultado: (id: string, isCorrect: boolean) => void;
}

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    (set) => ({
      flashcards: [],

      addFlashcard: (card) =>
        set((state) => ({
          flashcards: [
            ...state.flashcards,
            {
              ...card,
              id: Date.now().toString() // ✅ ACÁ SE CREA EL ID
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
      registrarResultado: (_id, _isCorrect) => {
        // 🚧 D3 lo implementa
      },
    }),
    {
      name: "flashcard-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);