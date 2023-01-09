import Link from "next/link";
import { useRouter } from "next/router";
import PostPreview, {
  formatLargeNumbersWithCommas,
  PostData,
} from "../../../components/Posts/PostPreview";
import { ThreadData } from "../../../components/Threads/ThreadPreview";
import styles from "../../../styles/Thread.module.css";
import SearchBar from "../../../components/SearchBar";
import Chips from "../../../components/Chips";

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
  isFeatured: false,
  isHotTrending: false,
  isTopThree: false,
  title: "Yas marina",
  views: 6_403_402,
};

const mockPostTwo: PostData = {
  id: "125",
  author: "Bo",
  body: "Yall this might work",
  categories: ["fafb", "bruh", "a", "b", "c", "d"],
  comments: "",
  date: "15/15/15",
  downvotes: 5_000,
  upvotes: 5_103,
  image: "yes",
  isFeatured: false,
  isHotTrending: false,
  isTopThree: false,
  title: "Yas marina",
  views: 2_403_402,
};

const mockPostThree: PostData = {
  id: "126",
  author: "Bo",
  body: "Yall this might work",
  categories: ["fafb", "bruh", "a", "b", "c", "d"],
  comments: "",
  date: "15/15/15",
  downvotes: 5_000,
  upvotes: 5_103,
  image: "yes",
  isFeatured: false,
  isHotTrending: false,
  isTopThree: false,
  title: "Yas marina",
  views: 1_403_402,
};

const mockArrPosts = [mockPostOne, mockPostTwo, mockPostThree];

const mockThread: ThreadData = {
  author: "Bovine",
  categories: ["fast", "faster", "fastest", "speed", "yeet"],
  date: "14/14/14",
  id: "321",
  members: 499_044_244,
  title: "Why did the dog cross the road",
  body: "for no reason",
  isFeatured: true,
  isHotTrending: true,
  isTopThree: false,
  image: "yes",
  posts: ["124", "125", "126"],
};

// TODO: pull the posts from the db based on their ids

const Thread = () => {
  const router = useRouter();
  const threadId = router.query.thread; // This gets the id of the thread which we can use to pull the data from the db for it
  // TODO: fetch thread data and destructure it below
  const { author, categories, date, members, title, posts, id, body } =
    mockThread;
  return (
    <div>
      <div className={styles.infoBox}>
        <h2 className={styles.title}>{title}</h2>
        <Chips
          categories={categories}
          regime="auto"
          color="var(--tertiary-forum-color)"
          bgColor="var(--fifth-forum-color)"
        />
        <div className={styles.rightThreadSide}>
          <h4 className={styles.author}>{author}</h4>
          <h4 className={styles.date}>{date}</h4>
        </div>
        <div className={styles.rightThreadSide}>
          <svg style={{ width: "36px", height: "36px" }} viewBox="0 0 24 24">
            <path
              fill="#403103"
              d="M19 17V19H7V17S7 13 13 13 19 17 19 17M16 8A3 3 0 1 0 13 11A3 3 0 0 0 16 8M19.2 13.06A5.6 5.6 0 0 1 21 17V19H24V17S24 13.55 19.2 13.06M18 5A2.91 2.91 0 0 0 17.11 5.14A5 5 0 0 1 17.11 10.86A2.91 2.91 0 0 0 18 11A3 3 0 0 0 18 5M8 10H5V7H3V10H0V12H3V15H5V12H8Z"
            />
          </svg>
          <h4 className={styles.members}>
            {formatLargeNumbersWithCommas(members)}
          </h4>
        </div>
        <h3 className={styles.body}>{body}</h3>
      </div>
      <SearchBar placeholder="Search for posts..." />
      {mockArrPosts.map((post, index) => (
        <Link href={"/threads/" + threadId + "/posts/" + post.id} key={index}>
          <PostPreview
            author={post.author}
            categories={post.categories}
            date={post.date}
            image={post.image}
            id={post.id}
            title={post.title}
            views={post.views}
            upvotes={post.upvotes}
            body={post.body}
            downvotes={post.downvotes}
          />
        </Link>
      ))}
    </div>
  );
};

export default Thread;
