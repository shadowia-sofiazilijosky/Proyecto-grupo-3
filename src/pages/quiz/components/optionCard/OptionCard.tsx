import styles from "../../quiz.module.css";

type Props = {
    text: string;
    isCorrect: boolean;
    isSelected: boolean;
    flipped: boolean;
    onClick: () => void;
};

const OptionCard = ({
    text,
    isCorrect,
    isSelected,
    flipped,
    onClick,
}: Props) => {
    return (
        <div className={styles.optionCardWrapper} onClick={onClick}>

  {/* 👉 ESTE define la altura real */}
  <div className={styles.optionContentSize}>
    {text}
  </div>

  <div className={`${styles.optionInner} ${flipped ? styles.optionFlipped : ""}`}>

    <div className={`${styles.optionFace} ${styles.optionFront}`}>
      {text}
    </div>

    <div
      className={`${styles.optionFace} ${styles.optionBack}
        ${flipped && isCorrect ? styles.optionCorrect : ""}
        ${flipped && !isCorrect ? styles.optionIncorrect : ""}
      `}
    />

  </div>
</div>
    );
};

export default OptionCard;