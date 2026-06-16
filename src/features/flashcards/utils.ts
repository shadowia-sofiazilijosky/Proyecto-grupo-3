import { isToday, isYesterday, parseISO } from "date-fns";

export const calculateNewStreak = (lastStudyDateStr: string | null, currentStreak: number): number => {
  // Si es la primera vez que estudia en su vida, la racha arranca en 1
  if (!lastStudyDateStr) {
    return 1;
  }

  const lastDate = parseISO(lastStudyDateStr);

  // Si ya estudió hoy y hace otra tarjeta, la racha se mantiene igual
  if (isToday(lastDate)) {
    return currentStreak;
  }

  // Si estudió ayer, ¡viene bien! La racha suma 1 día más
  if (isYesterday(lastDate)) {
    return currentStreak + 1;
  }

  // Si pasaron 2 o más días sin estudiar, se rompió la racha y vuelve a 1
  return 1;
};