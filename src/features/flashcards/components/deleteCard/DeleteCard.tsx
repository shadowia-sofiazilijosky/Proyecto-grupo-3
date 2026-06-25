import { useFlashcardStore } from "../../store";
import style from "./deleteCard.module.css";

interface DeleteFlashcardProps {
  id: string;
  onDone?: () => void;
}

export function DeleteFlashcard({ id, onDone }: DeleteFlashcardProps) {
  const removeFlashcard = useFlashcardStore((s) => s.removeFlashcard);

  function handleDelete() {
    removeFlashcard(id);
    onDone?.();
  }

  return (
    <button
    className={style.btn}
    type="button"
    onClick={handleDelete}
  >
    <span className={style.icon}>✕</span>
    Eliminar
  </button>
  );
}

