import styles from "../../../../pages/flashcards/studycards.module.css";
import cardStyles from "../../../../shared/components/ui/flipcard/card.module.css";
import { useMemo } from "react"; // Necesitamos esto para que el color sea estable

type Props = {
  hasCards: boolean;
  currentIndex: number;
  total: number;
  card: any;
  showAnswer: boolean;
  handleClick: () => void;
  filter: string;
};

const StudyMain = ({
  hasCards,
  currentIndex,
  total,
  card,
  showAnswer,
  handleClick,
  filter
}: Props) => {

  // Generamos un color aleatorio estable para esta tarjeta específica
  const pastelColors = [
    "#fecaca", "#fde68a", "#bbf7d0", "#bfdbfe", "#ddd6fe", "#fbcfe8", "#c7d2fe"
  ];
  
  const randomColor = useMemo(() => {
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  }, [currentIndex]); // Cambia solo cuando pasas a la siguiente tarjeta

  return (
    <main className={styles.main}>
      <h2 className={styles.animatedTitle}>Modo Estudio</h2>

      {hasCards ? (
        <>
          <p className={styles.counter}>
            {currentIndex + 1} / {total}
          </p>

          <div 
            className={`${cardStyles.cardWrapper} ${cardStyles.cardSizeDefault} ${cardStyles.cardStudyMobile} ${styles.rainbowCard}`} 
            onClick={handleClick}
          >
            <div
              className={`${cardStyles.cardInner} ${showAnswer ? cardStyles.flipped : ""}`}
            >
              {/* Pregunta */}
              <div className={`${cardStyles.cardFace} ${cardStyles.front} ${styles.front} ${styles.cardQuestion}`}>
                {card.question}
              </div>

              {/* Respuesta con color aleatorio y tipografía Lora */}
              <div
                className={`${cardStyles.cardFace} ${cardStyles.back} ${styles.back} ${styles[filter]}`}
                style={{ backgroundColor: showAnswer ? randomColor : "transparent" }}
              >
                <div className={styles.answerContent}>
                  {card.answer}
                </div>
              </div>
            </div>
          </div>

          <p className={styles.hint}>
            {showAnswer
              ? "Click para la siguiente"
              : "Pensá la respuesta y hacé click"}
          </p>
        </>
      ) : (
        <div className={styles.emptyBox}>
          <h3>¡Ups!</h3>
          <p>No encontramos tarjetas para este filtro.</p>
          <p style={{marginTop: '20px', fontSize: '0.9rem'}}>Probá cambiando el filtro o creá una nueva.</p>
        </div>
      )}
    </main>
  );
};

export default StudyMain;