import type { Flashcard } from "../../types";
import style from "./cardItem.module.css";

interface FlashcardItemProps {
  card: Flashcard;
  onEditClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

// ─── Motor para calcular el tiempo real ───
const calcularTiempoPasado = (fechaString?: string) => {
  if (!fechaString) return "Sin revisar";
  
  const fechaRevision = new Date(fechaString);
  const ahora = new Date();
  const diferenciaMilisegundos = ahora.getTime() - fechaRevision.getTime();
  
  const minutos = Math.floor(diferenciaMilisegundos / (1000 * 60));
  const horas = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));
  const dias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

  if (minutos < 1) return "hace un momento";
  if (minutos < 60) return `hace ${minutos} min`;
  if (horas < 24) return `hace ${horas} horas`;
  if (dias === 1) return "hace 1 día";
  return `hace ${dias} días`;
};

export function FlashcardItem({ card, onEditClick, onDeleteClick }: FlashcardItemProps) {
  const difficultyClass = style[`difficulty_${card.difficulty.toLowerCase()}`];

  // Sumamos automáticamente aciertos y errores reales de la base de datos
  const vecesRepasada = card.hits + card.misses;
  
  // Calculamos el texto de la fecha en tiempo real
  const textoUltimaRevision = calcularTiempoPasado(card.lastReview);

  return (
    <li className={`${style.card} ${difficultyClass}`}>
      
      <div className={style.header}>
        <span className={style.topic}>{card.topic}</span>
        <span className={style.difficulty}>{card.difficulty}</span>
      </div>

      <div className={style.body}>
        
        <div className={style.bubbleGroup}> 
          <span className={style.label}>Pregunta:</span>
          <p className={style.text}>{card.question}</p>
        </div>
        
        <div className={style.bubbleGroup}>
          <span className={style.label}>Respuesta:</span>
          <p className={style.text}>{card.answer}</p>
        </div>

        <div className={style.reviewSection}>
          <div className={style.reviewStats}>
            {/* Ahora usamos las variables dinámicas */}
            <span>Última revisión: {textoUltimaRevision}</span>
            <span>{vecesRepasada} veces repasada</span>
          </div>
          
          <div className={style.progressBarContainer}>
            <div className={style.progressBarFill}></div>
          </div>
        </div>

      </div>

      <div className={style.footer}>
        <button
          type="button"
          className={`${style.iconBtn} ${style.editIcon}`}
          onClick={() => onEditClick(card.id)}
          title="Editar"
        >
          ✏️
        </button>
        
        <button
          type="button"
          className={`${style.iconBtn} ${style.deleteIcon}`}
          onClick={() => onDeleteClick(card.id)}
          title="Borrar"
        >
          🗑️
        </button>
      </div>

    </li>
  );
}