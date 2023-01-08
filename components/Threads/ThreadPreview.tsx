import { Timestamp } from "firebase/firestore/lite";
import styles from "../../styles/ThreadPreview.module.css";
import { formatNumbers } from "../Posts/PostPreview";

export interface ThreadData {
  title: string;
  author: string;
  image?: string;
  date: string;
  members: number;
  categories: string[];
  isFeatured?: boolean;
  isTopThree?: boolean;
  isHotTrending?: boolean;
  posts?: string;
}

const ThreadPreview = (threadData: ThreadData) => {
  const { title, author, date, members, categories, isFeatured } = threadData;
  const first5Chips = categories.slice(0, 5);
  return (
    <div className={styles.mainContainer}>
      {isFeatured ? (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Aspect_ratio_-_16x9.svg/2560px-Aspect_ratio_-_16x9.svg.png"
          alt=""
          className={styles.img}
        />
      ) : null}
      <section className={styles.container}>
        <div className={styles.leftThreadSide}>
          <h2 className={styles.title}>
            {title.slice(0, 20)}
            {title.length > 20 ? "..." : null}
          </h2>
          <div className={styles.chipContainer}>
            {first5Chips.map((category) => (
              <span className={styles.chip}>{category}</span>
            ))}
            {categories.length > 5 ? (
              <span className={styles.chip}>and more...</span>
            ) : null}
          </div>
          <div className={styles.authorContainer}>
            <h3 className={styles.author}>{author}</h3>
            <h3 className={styles.date}>{date}</h3>
          </div>
        </div>
        <div className={styles.rightThreadSide}>
          <svg style={{ width: "36px", height: "36px" }} viewBox="0 0 24 24">
            <path
              fill="#403103"
              d="M19 17V19H7V17S7 13 13 13 19 17 19 17M16 8A3 3 0 1 0 13 11A3 3 0 0 0 16 8M19.2 13.06A5.6 5.6 0 0 1 21 17V19H24V17S24 13.55 19.2 13.06M18 5A2.91 2.91 0 0 0 17.11 5.14A5 5 0 0 1 17.11 10.86A2.91 2.91 0 0 0 18 11A3 3 0 0 0 18 5M8 10H5V7H3V10H0V12H3V15H5V12H8Z"
            />
          </svg>
          <span className={styles.members}>{formatNumbers(members)}</span>
        </div>
      </section>
    </div>
  );
};

export default ThreadPreview;
