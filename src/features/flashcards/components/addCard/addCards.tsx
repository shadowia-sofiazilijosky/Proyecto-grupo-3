import { useState } from "react";
import { useFlashcardStore } from "../../store";
import { DIFFICULTIES } from "../../types";
import type { Difficulty } from "../../types";
import style from "./addCard.module.css"; 

interface FormValues {
  question: string;
  answer: string;
  topic: string;
  difficulty: Difficulty;
}

const DEFAULT_VALUES: FormValues = {
  question: "",
  answer: "",
  topic: "",
  difficulty: "medium",
};

export function CreateFlashcard() {
  const addFlashcard = useFlashcardStore((s) => s.addFlashcard);
  const [values, setValues] = useState<FormValues>(DEFAULT_VALUES);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addFlashcard({ ...values, hits: 0, misses: 0 });
    setValues(DEFAULT_VALUES);
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      
      {/* NOTA: Título y subtítulo eliminados de aquí para no duplicar.
         Ahora viven en tu página CreateCards.tsx
      */}

      {/* Primer Burbuja: Pregunta y Respuesta */}
      <div className={style.bubbleGroup}>
        <div className={style.field}>
          <label className={style.label}>Pregunta ❓</label>
          <textarea
            className={style.textarea}
            name="question"
            value={values.question}
            onChange={handleChange}
            placeholder="¿Qué querés recordar?"
            required
          />
        </div>

        <div className={style.field}>
          <label className={style.label}>Respuesta ✅</label>
          <textarea
            className={style.textarea}
            name="answer"
            value={values.answer}
            onChange={handleChange}
            placeholder="La respuesta correcta..."
            required
          />
        </div>
      </div>

      {/* Segunda Burbuja: Tema y Dificultad */}
      <div className={style.bubbleGroup}>
        <div className={style.row}>
          <div className={style.field}>
            <label className={style.label}>Tema 📁</label>
            <input
              className={style.input}
              name="topic"
              value={values.topic}
              onChange={handleChange}
              placeholder="ej: Matemáticas"
              required
            />
          </div>

          <div className={style.field}>
            <label className={style.label}>Dificultad 📊</label>
            <select
              className={style.select}
              name="difficulty"
              value={values.difficulty}
              onChange={handleChange}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Botón Final */}
      <button className={style.submit} type="submit">
        + Crear tarjeta
      </button>
      
    </form>
  );
}