import { FlashcardList } from "@/features/flashcards/components/cardList";
import { EditFlashcard } from "@/features/flashcards/components/addCard/EditCard";
import { useState } from "react";

const ListCards = () => {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div>
      <section>
        <h2>Editar flashcard</h2>
        {editingId ? (
          <EditFlashcard id={editingId} onDone={() => setEditingId(null)} />
        ) : (
          <p>Seleccioná una card del listado para editarla.</p>
        )}
      </section>
      <section>
        <h2>Listado</h2>
        <FlashcardList onEdit={setEditingId} />
      </section>
    </div>
  );
};

export default ListCards;
