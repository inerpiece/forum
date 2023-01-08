import { Timestamp } from "firebase/firestore/lite";
import styles from "../../styles/PostPreview.module.css";

export interface PostData {
  title: string;
  body: string;
  author: string;
  upvotes: number;
  downvotes: number;
  views: number;
  comments: string; // TODO: FIX THIS WHEN YOU CREATE THE COMMENT COMPONENT
  image: string;
  date: string;
  categories: string[];
  isFeatured: boolean;
  isTopThree: boolean;
  isHotTrending: boolean;
}

// formats large numbers so that they are shortened to 3 digits at most + 1 letter for a total of 4 characters
export const formatNumbers = (number: number) => {
  let num = number;
  let formattedNum;
  if (num >= 10_000 && num <= 999_999) {
    formattedNum = Math.floor(num / 1_000) + "K";
    return formattedNum;
  } else if (num >= 1_000_000 && num <= 999_999_999) {
    formattedNum = Math.floor(num / 1_000_000) + "M";
    return formattedNum;
  } else if (num >= 1_000_000_000) {
    formattedNum = Math.floor(num / 1_000_000_000) + "B";
    return formattedNum;
  }
  return num;
};

const PostPreview = (PostData: PostData) => {
  const { title, author, date, categories, isFeatured, views, upvotes } =
    PostData;
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
        <div className={styles.leftPostSide}>
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
        <div className={styles.rightPostSide}>
          <div className={styles.upvotesContainer}>
            <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
              <path
                className={styles.path}
                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
              />
            </svg>
            <span className={styles.views}>{formatNumbers(upvotes)}</span>
          </div>
          <div className={styles.viewsContainer}>
            <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
              <path
                className={styles.path}
                d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"
              />
            </svg>
            <span className={styles.views}>{formatNumbers(views)}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostPreview;
