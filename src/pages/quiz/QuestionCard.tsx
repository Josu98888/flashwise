import style from "./quiz.module.css";

type Props = {
  question: string;
  answer: string;
  flipped: boolean;
  selected: string | null;
  options: string[];
  handleSelect: (option: string) => void;
};

const QuestionCard = ({
  question,
  answer,
  flipped,
  selected,
  options,
  handleSelect,
}: Props) => {
  return (
    <div className={style.cardWrapper}>
      <div className={`${style.cardInner} ${flipped ? style.flipped : ""}`}>

        {/* 🔹 FRONT */}
        <div className={`${style.cardFace} ${style.front}`}>
          <div className={style.cardContent}>
          <h2>{question}</h2>

          <div className={style.optionsContainer}>
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(opt)}
                className={style.optionButton}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
</div>
        {/* 🔹 BACK */}
        <div
          className={`${style.cardFace} ${style.back} ${
            selected === answer
              ? style.correct
              : style.incorrect
          }`}
        >
         <div className={style.cardContent}>
  <h2>{answer}</h2>

  <div className={style.optionsContainer} style={{ visibility: "hidden" }}>
    placeholder
  </div>
</div>
</div>
      </div>
    </div>
  );
};

export default QuestionCard;