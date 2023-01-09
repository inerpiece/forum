import styles from "../styles/Author.module.css";
import { formatNumbers } from "./Posts/PostPreview";

interface AuthorData {
  username: string;
  score: number;
}

const Author = (props: AuthorData) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.userAvatar}>
          <svg style={{ width: "36px", height: "36px" }} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
            />
          </svg>
        </div>
        <h2>{props.username}</h2>
      </div>
      <h2 className={styles.score}>{formatNumbers(props.score)}</h2>
    </div>
  );
};

export default Author;
