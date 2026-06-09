import style from "./quiz.module.css";

type Props = {
  score: number;
  total: number;
  onReview: () => void;
  onRetry: () => void;
};

const Result = ({ score, total, onReview, onRetry }: Props) => {
  const porcentaje = Math.round((score / total) * 100);

  const getColor = () => {
    if (porcentaje >= 60) {
      const ratio = (porcentaje - 60) / 40;
      return `hsl(${120 - (1 - ratio) * 40}, 70%, 75%)`;
    } else {
      const ratio = porcentaje / 60;
      return `hsl(${0 + ratio * 40}, 70%, 75%)`;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.main}>

        {/* HEADER */}
        <div className={style.header}>
          <h1>Quiz🧠</h1>
          <p>
            Estos quiz son para practicar tu memoria y ver cómo te va recordando
            las flashcards.
          </p>
        </div>

        {/* RESULT BOX */}
        <div
          className={style.resultBox}
          style={{
            background: `linear-gradient(135deg, #ffffff, ${getColor()})`
          }}
        >
          <div className={style.resultContent}>
            <h2>Resultado 🎯</h2>

            <div className={style.resultGrid}>
              <div>
                <p>Progreso</p>
                <h3>{total} / {total}</h3>
              </div>

              <div>
                <p>Puntos</p>
                <h3>{score} / {total}</h3>
              </div>

              <div className={style.fullWidth}>
                <p>Porcentaje</p>
                <h1>{porcentaje}%</h1>
              </div>
            </div>
          </div>

          <div className={style.resultButtons}>
            <button className={style.primary} onClick={onReview}>
              Ver respuestas 👀
            </button>

            <button className={style.secondary} onClick={onRetry}>
              Reintentar 🔁
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Result;