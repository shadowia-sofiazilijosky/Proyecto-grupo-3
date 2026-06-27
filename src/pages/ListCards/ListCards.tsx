import { FlashcardList } from "@/features/flashcards/components/cardList/cardList";
import { EditFlashcard } from "@/features/flashcards/components/addCard/EditCard";
import { useState } from "react";
import style from "./listcards.module.css";
// IMPORTANTE: Importá el estilo de las burbujas
import addStyle from "@/features/flashcards/components/addCard/addCard.module.css";

const ListCards = () => {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className={style.container}> 
      {editingId ? (
        // APLICAMOS LA CLASE DE CONTENEDOR DE LA BURBUJA AQUÍ
        <section className={addStyle.formContainer}>
          <div className={addStyle.headerContainer}>
            <h2 className={addStyle.animatedTitle}>Editar Flashcard</h2>
            <p className={addStyle.animatedSubtitle}>Modificá los datos de tu tarjeta</p>
          </div>
          
          <EditFlashcard id={editingId} onDone={() => setEditingId(null)} />
        </section>
      ) : (
        <section className={style.listSection}>
          <h2 className={style.animatedTitle}>Mis Colecciones de Flashcards</h2>
          <FlashcardList onEdit={setEditingId} />
        </section>
      )}
    </div>
  );
};

export default ListCards;