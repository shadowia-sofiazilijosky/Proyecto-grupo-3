import styles from "./quiz.module.css";

const Header = () => (
    <div className={styles.header}>
        <h1>Quiz🧠</h1>
        <p>
            Poné a prueba cuánto recordás de lo que estudiaste</p>
        <p>✨ Este quiz mezcla tus flashcards
        para desafiar tu memoria y ayudarte a reforzar lo aprendido de manera dinámica 🧠💡</p>
    </div>
);

export default Header;