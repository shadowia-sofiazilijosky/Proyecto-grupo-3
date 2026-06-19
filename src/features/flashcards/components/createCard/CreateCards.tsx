import { CreateFlashcard } from "@/features/flashcards/components/addCard/addCards";
// Corregido: Ahora apunta al archivo exclusivo del formulario
import style from "./createCard.module.css"; 

export const CreateCards = () => {
  return (
    <main className={style.main}>
      <section className={style.formContainer}>
        {/* Usamos las clases que definimos para que el texto sea elegante */}
        <h2 className={style.title}>Nueva Flashcard</h2>
        <p className={style.subtitle}>Agregá una nueva tarjeta a tu mazo</p>
        
        {/* Aquí va tu formulario */}
        <CreateFlashcard />
      </section>
    </main>
  );
};