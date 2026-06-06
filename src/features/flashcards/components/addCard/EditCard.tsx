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

interface EditFlashcardProps {
  id: string;
  onDone?: () => void;
}

export function EditFlashcard({ id, onDone }: EditFlashcardProps) {
  const card = useFlashcardStore((s) => s.flashcards.find((c) => c.id === id));
  const updateFlashcard = useFlashcardStore((s) => s.updateFlashcard);

  const [values, setValues] = useState<FormValues>(() => {
    if (!card)
      return { question: "", answer: "", topic: "", difficulty: "medium" };
    return {
      question: card.question,
      answer: card.answer,
      topic: card.topic,
      difficulty: card.difficulty,
    };
  });

  if (!card) return <p>Flashcard no encontrada.</p>;

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
    updateFlashcard(id, values);
    onDone?.();
  }

  if (!card) return <p className={style.notFound}>Flashcard no encontrada.</p>;

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.formHeader}>
        <h2 className={style.formTitle}>Editar Flashcard</h2>
        <p className={style.formSubtitle}>Modificá los datos de la tarjeta</p>
      </div>

      <div className={style.fields}>
        <div className={style.field}>
          <label className={style.label} htmlFor="question">
            Pregunta
          </label>
          <textarea
            className={style.textarea}
            id="question"
            name="question"
            value={values.question}
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.field}>
          <label className={style.label} htmlFor="answer">
            Respuesta
          </label>
          <textarea
            className={style.textarea}
            id="answer"
            name="answer"
            value={values.answer}
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.row}>
          <div className={style.field}>
            <label className={style.label} htmlFor="topic">
              Tema
            </label>
            <input
              className={style.input}
              id="topic"
              name="topic"
              type="text"
              value={values.topic}
              onChange={handleChange}
              required
            />
          </div>

          <div className={style.field}>
            <label className={style.label} htmlFor="difficulty">
              Dificultad
            </label>
            <select
              className={style.select}
              id="difficulty"
              name="difficulty"
              value={values.difficulty}
              onChange={handleChange}
            >
              {DIFFICULTIES.map((d: Difficulty) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <button className={`${style.submit} ${style.submitEdit}`} type="submit">
        <span className={style.submitIcon}>✓</span>
        Guardar cambios
      </button>
    </form>
  );
}
