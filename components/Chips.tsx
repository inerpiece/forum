import styles from "../styles/Chips.module.css";
interface ChipData {
  categories: string[];
  regime: "auto" | "cut";
  color:
    | "var(--fifth-forum-color)"
    | "var(--forth-forum-color)"
    | "var(--tertiary-forum-color)";
  bgColor: "var(--fifth-forum-color)" | "var(--forth-forum-color)";
}

const Chip = (chips: ChipData) => {
  const { categories, regime, color, bgColor } = chips;

  const first5Chips = categories.slice(0, 5);
  return (
    <div className={styles.chipContainer}>
      {regime === "cut"
        ? first5Chips.map((category, index) => (
            <span
              className={styles.chip}
              key={index}
              style={{ backgroundColor: bgColor, color: color }}
            >
              {category}
            </span>
          ))
        : null}
      {regime === "cut" && categories.length > 5 ? (
        <span
          className={styles.chip}
          style={{ backgroundColor: bgColor, color: color }}
        >
          and more...
        </span>
      ) : null}
      {regime === "auto"
        ? categories.map((category, index) => (
            <span
              className={styles.chip}
              key={index}
              style={{ backgroundColor: bgColor, color: color }}
            >
              {category}
            </span>
          ))
        : null}
    </div>
  );
};

export default Chip;
