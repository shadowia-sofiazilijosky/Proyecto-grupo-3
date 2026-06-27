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

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      
      {/* Burbuja 1: Pregunta y Respuesta */}
      <div className={style.bubbleGroup}>
        <div className={style.field}>
          <label className={style.label} htmlFor="question">Pregunta ❓</label>
          <textarea
            className={style.textarea}
            id="question"
            name="question"
            value={values.question}
            onChange={handleChange}
            maxLength={300}
            required
          />
        </div>

        <div className={style.field}>
          <label className={style.label} htmlFor="answer">Respuesta ✅</label>
          <textarea
            className={style.textarea}
            id="answer"
            name="answer"
            value={values.answer}
            onChange={handleChange}
            maxLength={300}
            required
          />
          <div className={style.charCounter}>
            {values.answer.length} / 300
          </div>
        </div>
      </div>

      {/* Burbuja 2: Tema y Dificultad */}
      <div className={style.bubbleGroup}>
        <div className={style.row}>
          <div className={style.field}>
            <label className={style.label} htmlFor="topic">Tema 📁</label>
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
            <label className={style.label} htmlFor="difficulty">Dificultad 📊</label>
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

      <button className={style.submit} type="submit">
        Guardar cambios
      </button>
    </form>
  );
}