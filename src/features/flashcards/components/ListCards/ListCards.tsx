import { FlashcardList } from "@/features/flashcards/components/cardList";
import { EditFlashcard } from "@/features/flashcards/components/addCard/EditCard";
import { useState } from "react";
import style from "./listcards.module.css";

const ListCards = () => {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className={style.container}> 
      <section>
        <h2 className={style.title}>Editar flashcard</h2>
        {editingId ? (
          <EditFlashcard id={editingId} onDone={() => setEditingId(null)} />
        ) : (
          <p className={style.subtitle}>
            Seleccioná una card del listado para editarla.
          </p>
        )}
      </section>
      
      <section className={style.listSection}>
        <h2 className={style.titlelist}>Listado</h2>
        <FlashcardList onEdit={setEditingId} />
      </section>
    </div>
  );
};

export default ListCards;