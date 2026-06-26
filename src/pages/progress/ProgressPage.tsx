import { useState, useEffect, useMemo } from "react";
import { AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Flame, Layers, Target, Quote, Clock } from "lucide-react"; 
import { useFlashcardStore, type FlashcardState } from "../../features/flashcards/store"; 
import styles from "./progressPage.module.css"; 

const Wave = ({ startColor, endColor, id }: { startColor: string, endColor: string, id: string }) => (
  <svg width="85%" height="20" viewBox="0 0 200 20" preserveAspectRatio="none" style={{ marginTop: 'auto' }}>
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={startColor} />
        <stop offset="100%" stopColor={endColor} />
      </linearGradient>
    </defs>
    <path d="M 0,10 Q 25,0 50,10 T 100,10 T 150,10 T 200,10" fill="none" stroke={`url(#${id})`} strokeWidth="4" strokeLinecap="round" />
  </svg>
); 

const PIE_COLORS = { easy: "#86efac", medium: "#fcd34d", hard: "#fca5a5" };

export default function ProgressPage() {
  const [time, setTime] = useState(0);
  const [filterDays, setFilterDays] = useState(7); 

  const cards = useFlashcardStore((s: FlashcardState) => s.flashcards);
  const quizHistory = useFlashcardStore((s: FlashcardState) => s.quizHistory);

  const currentStreak = useMemo(() => {
    if (!quizHistory || quizHistory.length === 0) return 0;

    const uniqueDates = Array.from(new Set(quizHistory.map(h => h.date.split('T')[0])));
    let streak = 0;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (!uniqueDates.includes(todayStr) && !uniqueDates.includes(yesterdayStr)) {
      return 0; 
    } 
    
    const checkDate = new Date(uniqueDates.includes(todayStr) ? todayStr : yesterdayStr);
    
    while (true) {
      const checkStr = checkDate.toISOString().split('T')[0];
      if (uniqueDates.includes(checkStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }, [quizHistory]);

  const totalCards = cards.length;
  const studiedCount = cards.filter(c => c.hits > 0 || c.misses > 0).length; 
  
  const easyCount = cards.filter(c => c.difficulty === 'easy').length;
  const mediumCount = cards.filter(c => c.difficulty === 'medium').length;
  const hardCount = cards.filter(c => c.difficulty === 'hard').length;
  
  const easyPct = totalCards > 0 ? Math.round((easyCount / totalCards) * 100) : 0;
  const mediumPct = totalCards > 0 ? Math.round((mediumCount / totalCards) * 100) : 0;
  const hardPct = totalCards > 0 ? Math.round((hardCount / totalCards) * 100) : 0;

  const pieData = [
    { name: 'Easy', value: easyCount, color: PIE_COLORS.easy },
    { name: 'Medium', value: mediumCount, color: PIE_COLORS.medium },
    { name: 'Hard', value: hardCount, color: PIE_COLORS.hard }
  ];

  const totalScore = quizHistory.reduce((acc, curr) => acc + curr.score, 0);
  const totalPossible = quizHistory.reduce((acc, curr) => acc + curr.total, 0);
  const effectiveness = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

  const getChartData = () => {
    const data = [];
    const today = new Date(); 
    
    for (let i = filterDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];

      const dayHistory = quizHistory.filter((h) => h.date.startsWith(dateStr));
      
      let value = 0;
      if (dayHistory.length > 0) {
        const score = dayHistory.reduce((acc, curr) => acc + curr.score, 0);
        const total = dayHistory.reduce((acc, curr) => acc + curr.total, 0);
        value = total > 0 ? Math.round((score / total) * 100) : 0;
      }

      let label = '';
      if (filterDays === 7) {
        const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        label = daysOfWeek[d.getDay()];
      } else {
        label = `${d.getDate()}/${d.getMonth() + 1}`;
      }

      data.push({ day: label, value });
    }
    return data;
  };

  const dynamicChartData = getChartData();

  useEffect(() => {
    const timer = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Mi Rendimiento</h1>
      <p className={styles.sub}>Acá podés ver el resumen de tu esfuerzo y consistencia.</p>
      
      <div className={styles.timerDisplay}>
        <div className={styles.timerIcon}>
          <Clock size={20} color="#8b5cf6" />
        </div>
        <span className={styles.timerText}>Tiempo conectado:</span>
        <span className={styles.timerValue}>{formatTime(time)}</span>
        
        <div className={styles.timerStatus}>
          <span className={styles.statusDot}></span>
          Conectado ahora
        </div>
      </div> 
      
      <div className={styles.statsGrid}>
        <div className={styles.glassCard} style={{ 
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(254, 215, 170, 0.4) 100%)",
          border: "1px solid rgba(249, 115, 22, 0.5)",
          boxShadow: "0 0 20px rgba(249, 115, 22, 0.25)"
        }}>
          <div className={styles.iconBubble} style={{ border: "1px solid rgba(249, 115, 22, 0.6)", boxShadow: "0 0 15px rgba(249, 115, 22, 0.5)" }}>
            <Flame size={24} color="#f97316" />
          </div>
          <p className={styles.cardTitle}>Racha Actual</p>
          <h2 className={styles.cardNumber}>{currentStreak}</h2>
          <span className={styles.cardSubtitle}>días seguidos</span>
          <Wave startColor="#f97316" endColor="#fbbf24" id="wave1" />
        </div>

        <div className={styles.glassCard} style={{ 
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(221, 214, 254, 0.4) 100%)",
          border: "1px solid rgba(139, 92, 246, 0.5)",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.25)"
        }}>
          <div className={styles.iconBubble} style={{ border: "1px solid rgba(139, 92, 246, 0.6)", boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}>
            <Layers size={24} color="#8b5cf6" />
          </div>
          <p className={styles.cardTitle}>Tarjetas Estudiadas</p>
          <h2 className={styles.cardNumber}>{studiedCount}</h2>
          <span className={styles.cardSubtitle}>de {totalCards} en tu mazo</span>
          <Wave startColor="#8b5cf6" endColor="#c4b5fd" id="wave2" />
        </div>

        <div className={styles.glassCard} style={{ 
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(187, 247, 208, 0.4) 100%)",
          border: "1px solid rgba(34, 197, 94, 0.5)",
          boxShadow: "0 0 20px rgba(34, 197, 94, 0.25)"
        }}>
          <div className={styles.iconBubble} style={{ border: "1px solid rgba(34, 197, 94, 0.6)", boxShadow: "0 0 15px rgba(34, 197, 94, 0.5)" }}>
            <Target size={24} color="#22c55e" />
          </div>
          <p className={styles.cardTitle}>Efectividad</p>
          <h2 className={styles.cardNumber}>{effectiveness}%</h2>
          <span className={styles.cardSubtitle}>promedio de aciertos</span>
          <Wave startColor="#22c55e" endColor="#86efac" id="wave3" />
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.glassCard} style={{ 
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(221, 214, 254, 0.2) 100%)", 
          border: "1px solid rgba(139, 92, 246, 0.5)",
          boxShadow: "0 0 25px rgba(139, 92, 246, 0.2)"
        }}>
          <div className={styles.chartHeader}>
            <p className={styles.cardTitle} style={{ margin: 0 }}>Rendimiento Diario</p>
            <select className={styles.filterSelect} value={filterDays} onChange={(e) => setFilterDays(Number(e.target.value))}>
              <option value={7}>Últimos 7 días</option>
              <option value={15}>Últimos 15 días</option>
              <option value={30}>Últimos 30 días</option>
            </select>
          </div> 
          
          {/* TRUCO 99% y HEIGHT 220 APLICADOS AQUÍ */}
          <ResponsiveContainer width="99%" height={220}>
            <AreaChart data={dynamicChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(tick) => `${tick}%`} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} />
              <Tooltip cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" dot={{ r: 5, fill: "#fff", stroke: "#8b5cf6", strokeWidth: 2 }} activeDot={{ r: 7, fill: "#8b5cf6", stroke: "#fff" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.glassCard} style={{ 
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(254, 205, 211, 0.2) 100%)", 
          border: "1px solid rgba(244, 114, 182, 0.5)",
          boxShadow: "0 0 25px rgba(244, 114, 182, 0.2)"
        }}>
          <div className={styles.chartHeader}>
            <p className={styles.cardTitle} style={{ margin: 0 }}>Distribución de Dificultad</p>
          </div>

          <div className={styles.pieContent}>
            <div className={styles.pieWrapper}>
              
              {/* TRUCO 99% y HEIGHT 220 APLICADOS AQUÍ */}
              <ResponsiveContainer width="99%" height={220}>
                <PieChart>
                  <Pie data={pieData} innerRadius={50} outerRadius={75} dataKey="value" stroke="none">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" className={styles.pieNumber}>
                    {totalCards}
                  </text>
                  <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className={styles.pieLabelText}>
                    tarjetas
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div> 
            
            <div className={styles.legendWrapper}>
              <div className={styles.legendItem}>
                <div className={styles.legendLeft}><span className={styles.dot} style={{ background: PIE_COLORS.easy }}></span> Easy</div>
                <div className={styles.legendRight}>{easyCount} ({easyPct}%)</div>
              </div>
              <hr className={styles.legendDivider} />
              <div className={styles.legendItem}>
                <div className={styles.legendLeft}><span className={styles.dot} style={{ background: PIE_COLORS.medium }}></span> Medium</div>
                <div className={styles.legendRight}>{mediumCount} ({mediumPct}%)</div>
              </div>
              <hr className={styles.legendDivider} />
              <div className={styles.legendItem}>
                <div className={styles.legendLeft}><span className={styles.dot} style={{ background: PIE_COLORS.hard }}></span> Hard</div>
                <div className={styles.legendRight}>{hardCount} ({hardPct}%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerQuote} style={{ 
        background: "linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 253, 235, 0.8) 100%)", 
        border: "1px solid rgba(253, 224, 71, 0.5)", 
        boxShadow: "0 0 25px rgba(253, 224, 71, 0.25)" 
      }}>
        <div className={styles.quoteBubble}>
          <Quote size={24} fill="#ffffff" color="#ffffff" />
        </div>
        <p className={styles.quoteText}>
          La constancia es más importante que la intensidad. Sigue avanzando, cada tarjeta te acerca a tu meta.
        </p>
      </div>
    </main>
  );
}