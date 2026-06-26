// 
import { useState, useEffect, useMemo } from "react";
import { useFlashcardStore } from "@/features/flashcards/store";
import styles from "./studycards.module.css";
import Sidebar from "@/pages/flashcards/components/sidebar/Sidebar";
import StudyMain from "@/pages/flashcards/components/studymain/StudyMain";

const normalize = (str: string) => 
  str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const StudyCards = () => {
  const flashcards = useFlashcardStore((s) => s.flashcards);
  const markAsStudied = useFlashcardStore((s: any) => s.markAsStudied);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 1024) {
      setMenuOpen(false);
    }
  }, []);

  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");

  const filteredCards = useMemo(() => {
    if (filterType === "all") return flashcards;
    if (filterType === "difficulty") return flashcards.filter(c => c.difficulty === filterValue);
    if (filterType === "materia") {
      return flashcards.filter(c => normalize(c.topic) === filterValue);
    }
    return flashcards;
  }, [flashcards, filterType, filterValue]);

  const materiasUnicas = useMemo(() => {
    const list = flashcards.map(c => c.topic).filter(t => t && t !== "");
    const unique = Array.from(new Set(list.map(t => normalize(t))));
    return unique.sort((a, b) => a.localeCompare(b));
  }, [flashcards]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsAnswerVisible(false);
  }, [filterType, filterValue]);

  const hasCards = filteredCards.length > 0;
  const safeIndex = hasCards ? Math.min(currentIndex, filteredCards.length - 1) : 0;
  const card = filteredCards[safeIndex] ?? null;

  const handleClick = () => {
    if (!isAnswerVisible) {
      setIsAnswerVisible(true);
      if (card) {
        markAsStudied(card.id);
      }
    } else {
      setCurrentIndex((prev) => {
        if (prev < filteredCards.length - 1) {
          return prev + 1;
        }
        return 0;
      });
      setIsAnswerVisible(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <div className={styles.layout}>
      <Sidebar
        filterType={filterType}
        setFilterType={setFilterType}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        materiasUnicas={materiasUnicas}
        filteredCards={filteredCards}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        setShowAnswer={setIsAnswerVisible}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <StudyMain
        hasCards={hasCards}
        currentIndex={safeIndex}
        total={filteredCards.length}
        card={card}
        showAnswer={isAnswerVisible}
        handleClick={handleClick}
        onMenuClick={toggleMenu}
        menuOpen={menuOpen}
      />
    </div>
  );
};

export default StudyCards;
