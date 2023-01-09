import Author from "../../../../../components/Author";
import Chips from "../../../../../components/Chips";
import { PostData } from "../../../../../components/Posts/PostPreview";
import styles from "../../../../../styles/Post.module.css";

const mockPostOne: PostData = {
  id: "124",
  author: "Bo",
  body: "Yall this might work",
  categories: ["fafb", "bruh", "a", "b", "c", "d"],
  comments: "",
  date: "15/15/15",
  downvotes: 5_000,
  upvotes: 5_103,
  image: "yes",
  isFeatured: true,
  isHotTrending: false,
  isTopThree: false,
  title: "Yas marina",
  views: 6_403_402,
};

const Post = () => {
  const {
    title,
    body,
    date,
    downvotes,
    upvotes,
    isFeatured,
    views,
    categories,
    author,
  } = mockPostOne;
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <Chips
        categories={["asd"]}
        regime="auto"
        color="var(--fifth-forum-color)"
        bgColor="var(--forth-forum-color)"
      />
      <Author username="Joe Bo" score={300_000} />
      <h3 className={styles.date}>{date}</h3>
      {isFeatured ? (
        <div className={styles.imgContainer}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Aspect_ratio_-_16x9.svg/2560px-Aspect_ratio_-_16x9.svg.png"
            alt=""
            className={styles.img}
          />
        </div>
      ) : null}
      <div className={styles.body}>{body}</div>
    </div>
  );
};

export default Post;
