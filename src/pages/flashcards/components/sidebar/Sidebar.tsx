import styles from "../../../../pages/flashcards/studycards.module.css";
import difficulties from "../../../../shared/design/difficulty.module.css";
import sidebar from "./sidebar.module.css";

type Props = {
  // Props nuevas para el filtro doble
  filterType: string;
  setFilterType: (val: string) => void;
  filterValue: string;
  setFilterValue: (val: string) => void;
  materiasUnicas: string[];
  // Props originales
  filteredCards: any[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  setShowAnswer: (val: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (val: boolean) => void;
};

const Sidebar = ({
  filterType,
  setFilterType,
  filterValue,
  setFilterValue,
  materiasUnicas,
  filteredCards,
  currentIndex,
  setCurrentIndex,
  setShowAnswer,
  menuOpen,
  setMenuOpen,
}: Props) => {
  return (
    <aside className={`${sidebar.sidebar} ${menuOpen ? sidebar.open : ""}`}>
      {/* Título corregido con la clase para degradado y fuente Lora */}
      <h2 className={sidebar.filterTitle}>Filtrar</h2>

      {/* Selector 1: Dividido por */}
      <label htmlFor="tipo-filtro" className={sidebar.label}>Dividido por:</label>
      <select
        id="tipo-filtro"
        className={sidebar.select}
        value={filterType}
        onChange={(e) => {
          setFilterType(e.target.value);
          setFilterValue(""); // Resetea el valor al cambiar categoría
        }}
      >
        <option value="all">Todas</option>
        <option value="difficulty">Dificultad</option>
        <option value="materia">Materia</option>
      </select>

      {/* Selector 2: Valor (Lógica solicitada) */}
      {filterType === "difficulty" && (
        <>
          <label htmlFor="valor-filtro" className={sidebar.label}>Dificultad:</label>
          <select
            id="valor-filtro"
            className={sidebar.select}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="">Selecciona una dificultad...</option>
            <option value="easy">Fácil</option>
            <option value="medium">Medio</option>
            <option value="hard">Difícil</option>
          </select>
        </>
      )}

      {filterType === "materia" && (
        <>
          <label htmlFor="valor-filtro" className={sidebar.label}>Materia:</label>
          <select
            id="valor-filtro"
            className={sidebar.select}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          >
            <option value="">Selecciona un tema...</option>
            {materiasUnicas.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </>
      )}

      <div className={sidebar.list}>
        {filteredCards.map((c, i) => (
          <div
            key={i}
            className={`
              ${sidebar.listItem} 
              ${difficulties[c.difficulty]} 
              ${i === currentIndex ? styles.active : ""}
            `}
            onClick={() => {
              setCurrentIndex(i);
              setShowAnswer(false); // ✅ Resetea la respuesta al cambiar de carta
              setMenuOpen(false);   // ✅ Cierra el menú en mobile
            }}
          >
            {c.question}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;