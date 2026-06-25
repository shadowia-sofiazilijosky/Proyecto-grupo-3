import { useFlashcardStore } from "@/features/flashcards/store"; 
import { FlashcardItem } from "@/features/flashcards/components/cardItem/CardItem";
import type { Flashcard } from "@/features/flashcards/types";
import { useState, useMemo } from "react";
import style from "./cardList.module.css";

interface FlashcardListProps {
  onEdit?: (id: string) => void;
}

// ─── FUNCIÓN PARA IGNORAR ACENTOS Y MAYÚSCULAS ───
const normalizeText = (text: string) => {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .toLowerCase()
    .trim();
};

export function FlashcardList({ onEdit }: FlashcardListProps) {
  const flashcards = useFlashcardStore((s: any) => s.flashcards);
  const deleteFlashcard = useFlashcardStore((s: any) => s.deleteFlashcard || s.removeFlashcard);

  const [materiaFilter, setMateriaFilter] = useState("");
  const [dificultadFilter, setDificultadFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const [editModalId, setEditModalId] = useState<string | null>(null);
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  // ─── AGRUPAMOS MATERIAS INTELIGENTEMENTE ───
  const materiasUnicas = useMemo(() => {
    if (!flashcards) return [];
    const normalizedMap = new Map();
    
    flashcards.forEach((c: Flashcard) => {
      if (c.topic) {
        const norm = normalizeText(c.topic);
        if (!normalizedMap.has(norm)) {
          normalizedMap.set(norm, c.topic); 
        }
      }
    });
    
    return Array.from(normalizedMap.entries()).map(([norm, original]) => ({
      value: norm,
      label: original,
    }));
  }, [flashcards]);

  // ─── FILTRAMOS CON EL BUSCADOR MEJORADO ───
  const flashcardsFiltradas = useMemo(() => {
    if (!flashcards) return [];
    return flashcards.filter((card: Flashcard) => {
      const matchMateria = materiaFilter 
        ? normalizeText(card.topic) === materiaFilter 
        : true;
        
      const matchDificultad = dificultadFilter 
        ? card.difficulty === dificultadFilter 
        : true;
      
      const searchLower = normalizeText(searchFilter);
      const matchSearch = searchFilter 
        ? normalizeText(card.topic).includes(searchLower) || 
          normalizeText(card.question).includes(searchLower) || 
          normalizeText(card.answer).includes(searchLower) 
        : true;

      return matchMateria && matchDificultad && matchSearch;
    });
  }, [flashcards, materiaFilter, dificultadFilter, searchFilter]);

  const handleConfirmEdit = () => {
    if (onEdit && editModalId) onEdit(editModalId);
    setEditModalId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteFlashcard && deleteModalId) deleteFlashcard(deleteModalId);
    setDeleteModalId(null);
  };

  if (!flashcards || flashcards.length === 0) {
    return <p className={style.empty}>No hay flashcards todavía.</p>;
  }

  return (
    <div className={style.listContainer}>
      
      <div className={style.filtersRow}>
        
        {/* ─── ACÁ SEPARAMOS EN DOS GRUPOS ─── */}
        <div className={style.filters}>
          
          {/* Grupo 1: Filterss y Materia */}
          <div className={style.filterGroup}>
            <span className={style.filterLabel}>Filtro:</span>
            <select value={materiaFilter} onChange={(e) => setMateriaFilter(e.target.value)}>
              <option value="">Materia</option>
              {materiasUnicas.map((materia) => (
                <option key={materia.value} value={materia.value}>{materia.label}</option>
              ))}
            </select>
          </div>

          {/* Grupo 2: Dificultad y Dificultad */}
          <div className={style.filterGroup}>
            <span className={style.filterLabel}>Dificultad:</span>
            <select value={dificultadFilter} onChange={(e) => setDificultadFilter(e.target.value)}>
              <option value="">Dificultad</option>
              <option value="easy">Fácil</option>
              <option value="medium">Media</option>
              <option value="hard">Difícil</option>
            </select>
          </div>

        </div>

        <div className={style.search}>
          <input 
            type="text" 
            placeholder="🔍 Buscar" 
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </div>

      <ul className={style.list}>
        {flashcardsFiltradas.length > 0 ? (
          flashcardsFiltradas.map((card: Flashcard) => (
            <FlashcardItem 
              key={card.id} 
              card={card} 
              onEditClick={setEditModalId} 
              onDeleteClick={setDeleteModalId} 
            />
          ))
        ) : (
          <p className={style.empty}>No se encontraron tarjetas con esos filtros.</p>
        )}
      </ul>

      {/* ─── MODALES ─── */}
      {editModalId && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <p>¿Seguro que quiere editar esta tarjeta de estudio?</p>
            <div className={style.modalActions}>
              <button onClick={handleConfirmEdit} className={`${style.modalBtn} ${style.btnYes}`}>Sí</button>
              <button onClick={() => setEditModalId(null)} className={`${style.modalBtn} ${style.btnNo}`}>No</button>
            </div>
          </div>
        </div>
      )}

      {deleteModalId && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <p>¿Seguro que quiere borrar esta tarjeta de estudio?</p>
            <div className={style.modalActions}>
              <button onClick={handleConfirmDelete} className={`${style.modalBtn} ${style.btnYes}`}>Sí</button>
              <button onClick={() => setDeleteModalId(null)} className={`${style.modalBtn} ${style.btnNo}`}>No</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}