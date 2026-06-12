import styles from "../../quiz.module.css";
import cardStyles from "../../../../shared/components/ui/flipcard/card.module.css";
import review from "../review/review.module.css";

type Props = {
  question: string;
  answer: string;
  flipped: boolean;
  selected: string | null;
  options: string[];
  handleSelect: (option: string) => void;
  hits: number;
  misses: number;
};

const QuestionCard = ({
  question,
  answer,
  flipped,
  selected,
  options,
  handleSelect,
  hits= 0,
  misses= 0,
}: Props) => {
  return (
    <div  className={`${cardStyles.cardWrapper} ${cardStyles.cardSizeDefault} ${cardStyles.cardQuizMobile}`}>
      <div className={`${cardStyles.cardInner} ${flipped ? cardStyles.flipped : ""}`}>

        {/* 🔹 FRONT */}
        <div className={`${cardStyles.cardFace} ${styles.cardFace} ${cardStyles.front} ${styles.front}`}>
          <div className={styles.cardContent}>
          <h2>{question}</h2>
          <div className={styles.counters}>
            <span className={styles.hitCount}>🟩 {hits}</span>
            <span className={styles.missCount}>🟥 {misses}</span>
          </div>

          <div className={styles.optionsContainer}>
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                className={styles.optionButton}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
</div>
        {/* 🔹 BACK */}
        <div
          className={`${cardStyles.cardFace} ${styles.cardFace} ${cardStyles.back} ${
            selected === answer
              ? review.correct
              : review.incorrect
          }`}
        >
         <div className={styles.cardContent}>
  <h2>{answer}</h2>

  <div className={styles.optionsContainer} style={{ visibility: "hidden" }}>
    placeholder
  </div>
</div>
</div>
      </div>
    </div>
  );
};

export default QuestionCard;