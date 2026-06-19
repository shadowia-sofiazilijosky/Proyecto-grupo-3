import { DeleteFlashcard } from "../deleteCard/DeleteCard";
import type { Flashcard } from "../../types";
import style from "./cardItem.module.css";

interface FlashcardItemProps {
  card: Flashcard;
  onEdit?: (id: string) => void;
}

export function FlashcardItem({ card, onEdit }: FlashcardItemProps) {
  // Aplicamos la clase de dificultad al contenedor principal del li
  const difficultyClass = style[`difficulty_${card.difficulty.toLowerCase()}`];

  return (
    <li className={`${style.card} ${difficultyClass}`}>
      {/* Header burbuja */}
      <div className={style.header}>
        <span className={style.topic}>{card.topic}</span>
        <span className={style.difficulty}>
          {card.difficulty}
        </span>
      </div>

      {/* Body: Aplicamos el estilo de "sub-burbujas" */}
      <div className={style.body}>
        <div className={style.bubbleGroup}> 
          <span className={style.label}>Pregunta</span>
          <p className={style.text}>{card.question}</p>
        </div>
        
        <div className={style.bubbleGroup}>
          <span className={style.label}>Respuesta</span>
          <p className={style.text}>{card.answer}</p>
        </div>
      </div>

      {/* Footer */}
      <div className={style.footer}>
        <div className={style.stats}>
          <span className={`${style.stat} ${style.statHits}`}>
            <span className={style.statIcon}>✓</span> {card.hits}
          </span>
          <span className={`${style.stat} ${style.statMisses}`}>
            <span className={style.statIcon}>✗</span> {card.misses}
          </span>
        </div>

        <div className={style.actions}>
          {onEdit && (
            <button
              type="button"
              className={`${style.btn} ${style.btnEdit}`}
              onClick={() => onEdit(card.id)}
            >
              Editar
            </button>
          )}
          <DeleteFlashcard id={card.id} />
        </div>
      </div>
    </li>
  );
}