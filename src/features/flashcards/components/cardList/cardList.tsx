import { useFlashcardStore } from "@/features/flashcards/store"; 
import { FlashcardItem } from "@/features/flashcards/components/cardItem/CardItem";
import type { Flashcard } from "@/features/flashcards/types";
// IMPORTANTE: Esta es la ruta absoluta al CSS que está en ListCards
import style from "@/features/flashcards/components/ListCards/listcards.module.css";

interface FlashcardListProps {
  onEdit?: (id: string) => void;
}

export function FlashcardList({ onEdit }: FlashcardListProps) {
  const flashcards = useFlashcardStore((s: any) => s.flashcards);

  if (!flashcards || flashcards.length === 0) {
    return <p>No hay flashcards todavía.</p>;
  }

  return (
    <ul className={style.list}>
      {flashcards.map((card: Flashcard) => (
        <FlashcardItem key={card.id} card={card} onEdit={onEdit} />
      ))}
    </ul>
  );
}