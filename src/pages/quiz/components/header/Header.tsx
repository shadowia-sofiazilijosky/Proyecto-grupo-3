import styles from "../../quiz.module.css";

const Header = () => (
  <div className={styles.header}>
    <div className={styles.headerTitleContainer}>
      <span className={styles.star}>✨</span>
      <h1 className={styles.headerTitle}>Quiz</h1>
      <span className={styles.star}>✨</span>
    </div>
    <p>
      Poné a prueba cuánto recordás de lo que estudiaste
    </p>
    <p>
      Este quiz mezcla tus flashcards para desafiar tu memoria y ayudarte 
      a reforzar lo aprendido de manera dinámica 🧠💡
    </p>
  </div>
);

export default Header;