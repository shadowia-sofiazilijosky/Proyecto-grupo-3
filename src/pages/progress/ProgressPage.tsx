import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Flame, Layers, Target } from "lucide-react";
import { useFlashcardStore, type FlashcardState } from "../../features/flashcards/store"; 
import styles from "./progressPage.module.css";

const dataLine = [
  { day: "Lun", value: 50 }, { day: "Mar", value: 75 },
  { day: "Mié", value: 45 }, { day: "Jue", value: 90 },
  { day: "Vie", value: 70 }, { day: "Sáb", value: 95 }, { day: "Dom", value: 60 }
];

const COLORS = ["#bbf7d0", "#fde68a", "#fecaca"];

export default function ProgressPage() {
  const [time, setTime] = useState(0);

  // Conexión al estado real usando Zustand
  const cards = useFlashcardStore((s: FlashcardState) => s.flashcards);
  const quizHistory = useFlashcardStore((s: FlashcardState) => s.quizHistory);

  // Cálculos dinámicos
  const totalCards = cards.length;
  const easyCount = cards.filter(c => c.difficulty === 'easy').length;
  const mediumCount = cards.filter(c => c.difficulty === 'medium').length;
  const hardCount = cards.filter(c => c.difficulty === 'hard').length;
  
  // Cálculo de efectividad basado en el promedio de TODOS los quizzes guardados
  const totalScore = quizHistory.reduce((acc, curr) => acc + curr.score, 0);
  const totalPossible = quizHistory.reduce((acc, curr) => acc + curr.total, 0);
  const effectiveness = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  useEffect(() => {
    const timer = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Mi Rendimiento</h1>
      <p className={styles.sub}>Acá podés ver el resumen de tu esfuerzo y consistencia.</p>
      
      <div className={styles.timerDisplay}>
        <span>🕒 Tiempo conectado: <strong>{formatTime(time)}</strong></span>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.glassCard}>
          <Flame size={32} color="#f97316" style={{ margin: "0 auto 10px" }} />
          <p>RACHA ACTUAL</p> <h2>0</h2> <span>días seguidos</span> <div className={styles.wave} />
        </div>
        <div className={styles.glassCard}>
          <Layers size={32} color="#8b5cf6" style={{ margin: "0 auto 10px" }} />
          <p>TARJETAS ESTUDIADAS</p> <h2>{totalCards}</h2> <span>en tu mazo</span> <div className={styles.wave} />
        </div>
        <div className={styles.glassCard}>
          <Target size={32} color="#22c55e" style={{ margin: "0 auto 10px" }} />
          <p>EFECTIVIDAD</p> <h2>{effectiveness}%</h2> <span>promedio de aciertos</span> <div className={styles.wave} />
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.glassCard}>
          <h3>Rendimiento Diario</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={dataLine}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.glassCard}>
          <h3>Distribución de Dificultad</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie 
                data={[
                  { name: 'Easy', value: easyCount },
                  { name: 'Medium', value: mediumCount },
                  { name: 'Hard', value: hardCount }
                ]} 
                innerRadius={50} outerRadius={70} dataKey="value"
              >
                {[easyCount, mediumCount, hardCount].map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className={styles.centerText}>
                {totalCards}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.footerQuote}>
        <p>"La constancia es más importante que la intensidad. Sigue avanzando, cada tarjeta te acerca a tu meta."</p>
      </div>
    </main>
  );
}