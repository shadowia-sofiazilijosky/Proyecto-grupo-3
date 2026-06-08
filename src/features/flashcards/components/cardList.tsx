import { useFlashcardStore } from "../store";
import { FlashcardItem } from "./cardItem/CardItem";
import style from "./cardItem/cardItem.module.css";
interface FlashcardListProps {
  onEdit?: (id: string) => void;
}

export function FlashcardList({ onEdit }: FlashcardListProps) {
  const flashcards = useFlashcardStore((s) => s.flashcards);

  if (flashcards.length === 0) return <p>No hay flashcards todavía.</p>;

  return (
    <ul className={style.list}>
      {flashcards.map((card) => (
        <FlashcardItem key={card.id} card={card} onEdit={onEdit} />
      ))}
    </ul>
  );
}
