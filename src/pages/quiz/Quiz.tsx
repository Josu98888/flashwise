import { useState, useEffect } from "react";
import { useFlashcardStore } from "../../features/flashcards/store";
import style from "./quiz.module.css";

import Header from "./Header";
import QuestionCard from "./QuestionCard";
import Result from "./Result";
import Review from "./Review";

type Answer = {
    question: string;
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
};

const Quiz = () => {
    const flashcards = useFlashcardStore((s) => s.flashcards);
    const registrarResultado = useFlashcardStore((s) => s.registrarResultado);

    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [options, setOptions] = useState<string[]>([]);

    const current = flashcards[index];

    useEffect(() => {
        if (!current) return;
        const newOptions = generateOptions();
        setOptions(newOptions);
    }, [current]);

    const generateOptions = () => {
        const answers = flashcards.map((c) => c.answer);
        const incorrect = answers.filter((a) => a !== current.answer);
        const shuffled = [...incorrect].sort(() => Math.random() - 0.5);

        const totalOptions = flashcards.length >= 4 ? 4 : 2;

        const options = [current.answer, ...shuffled.slice(0, totalOptions - 1)];
        return options.sort(() => Math.random() - 0.5);
    };

    const handleSelect = (option: string) => {
        if (flipped) return;

        const isCorrect = option === current.answer;

        setSelected(option);
        setFlipped(true);

        if (isCorrect) {
            setScore((prev) => prev + 1);
        }

        registrarResultado(current.id, isCorrect);

        setAnswers((prev) => [
            ...prev,
            {
                question: current.question,
                correctAnswer: current.answer,
                userAnswer: option,
                isCorrect,
            },
        ]);

        setTimeout(() => {
            const next = index + 1;
            if (next < flashcards.length) {
                setIndex(next);
                setFlipped(false);
                setSelected(null);
            } else {
                setFinished(true);
            }
        }, 1200);
    };

    // ❗ MISMO FLUJO

    if (flashcards.length < 4) {
        return <p>Necesitás al menos 4 tarjetas 😅</p>;
    }

    if (showReview) {
        return <Review answers={answers} onBack={() => setShowReview(false)} />;
    }

    if (finished) {
        return (
            <Result
                score={score}
                total={flashcards.length}
                onReview={() => setShowReview(true)}
                onRetry={() => {
                    setIndex(0);
                    setFlipped(false);
                    setSelected(null);
                    setScore(0);
                    setFinished(false);
                    setAnswers([]);
                    setShowReview(false);
                }}
            />
        );
    }

    return (
        <div className={style.container}>
  <div className={style.main}>
    <Header />

    <p className={style.progress}>{index + 1} / {flashcards.length}</p>

    <QuestionCard
      question={current.question}
      answer={current.answer}
      flipped={flipped}
      selected={selected}
      options={options}
      handleSelect={handleSelect}
    />
  </div>
  </div>
);
};

export default Quiz;