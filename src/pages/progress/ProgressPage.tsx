import { ProgressPanel } from "@/features/flashcards/components/ProgressPanel";
import style from "./progressPage.module.css";

export default function ProgressPage() {
  return (
    <main className={style.main}>
      <div className={style.headerArea}>
        <h1 className={style.heading}>Mi Rendimiento</h1>
        <p className={style.sub}>Acá podés ver el resumen de tu esfuerzo y consistencia.</p>
      </div>
      
      {/* panel */}
      <ProgressPanel />
    </main>
  );
}