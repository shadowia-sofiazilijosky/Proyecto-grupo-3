import { CreateFlashcard } from "@/features/flashcards/components/addCard/addCards";
import style from "./createCard.module.css"; 

export const CreateCards = () => {
  return (
    <main className={style.main}>
      <section className={style.formContainer}>
        
        {/* Título y subtítulo estético */}
        <div className={style.headerContainer}>
          <h2 className={style.animatedTitle}>Nueva Flashcard</h2>
          <p className={style.animatedSubtitle}>Agregá una nueva tarjeta a tu mazo</p>
        </div>
        
        {/* El formulario ahora solo contiene los campos e inputs */}
        <CreateFlashcard />
      </section>
    </main>
  );
};