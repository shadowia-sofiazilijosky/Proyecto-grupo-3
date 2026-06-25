import { FlashcardList } from "@/features/flashcards/components/cardList/cardList";
import { EditFlashcard } from "@/features/flashcards/components/addCard/EditCard";
import { useState } from "react";
import style from "./listcards.module.css";

const ListCards = () => {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className={style.container}> 
      {/* Si toqué el lápiz para editar, muestro el componente de edición */}
      {editingId ? (
        <section className={style.formContainer}>
          {/* Mantenemos el estilo de título degradado también aquí */}
          <h2 className={style.animatedTitle}>Editar Flashcard</h2>
          <EditFlashcard id={editingId} onDone={() => setEditingId(null)} />
        </section>
      ) : (
        /* Si NO estoy editando, muestro la página con el título aesthetic y fuente Lora */
        <section className={style.listSection}>
          <h2 className={style.animatedTitle}>Mis Colecciones de Flashcards</h2>
          <FlashcardList onEdit={setEditingId} />
        </section>
      )}
    </div>
  );
};

export default ListCards;