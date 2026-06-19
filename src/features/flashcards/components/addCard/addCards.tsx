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

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addFlashcard({
      ...values,
      hits: 0,
      misses: 0
    });
    setValues(DEFAULT_VALUES);
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {/* Bloque 1: Pregunta y Respuesta en su burbuja */}
      <div className={style.bubbleGroup}>
        <div className={style.field}>
          <label className={style.label} htmlFor="question">Pregunta</label>
          <textarea
            className={style.textarea}
            id="question"
            name="question"
            value={values.question}
            onChange={handleChange}
            placeholder="¿Qué querés recordar?"
            required
          />
        </div>

        <div className={style.field}>
          <label className={style.label} htmlFor="answer">Respuesta</label>
          <textarea
            className={style.textarea}
            id="answer"
            name="answer"
            value={values.answer}
            onChange={handleChange}
            placeholder="La respuesta correcta..."
            required
          />
        </div>
      </div>

      {/* Bloque 2: Tema y Dificultad en su burbuja */}
      <div className={style.bubbleGroup}>
        <div className={style.row}>
          <div className={style.field}>
            <label className={style.label} htmlFor="topic">Tema</label>
            <input
              className={style.input}
              id="topic"
              name="topic"
              type="text"
              value={values.topic}
              onChange={handleChange}
              placeholder="ej: Matemáticas"
              required
            />
          </div>

          <div className={style.field}>
            <label className={style.label} htmlFor="difficulty">Dificultad</label>
            <select
              className={style.select}
              id="difficulty"
              name="difficulty"
              value={values.difficulty}
              onChange={handleChange}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Botón final fuera de los grupos para mayor separación */}
      <button className={style.submit} type="submit">
        <span className={style.submitIcon}>+</span> Crear tarjeta
      </button>
    </form>
  );
}