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
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore/lite";
import { initFirebase } from "../../../db";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const app = initFirebase();

const db = getFirestore(app);

const auth = getAuth(app);

const mockPostOne: PostData = {
  id: "124",
  author: "Bo",
  body: "Yall this might work",
  categories: ["fafb", "bruh", "a", "b", "c", "d"],
  comments: [
    { author: "Bo", body: "First comment", upvotes: 20, downvotes: 3 },
  ],
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
  comments: [
    { author: "Bo", body: "First comment", upvotes: 20, downvotes: 3 },
  ],
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
  comments: [
    { author: "Bo", body: "First comment", upvotes: 20, downvotes: 3 },
  ],
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
  const [userEmail, setUserEmail] = useState<string | null>("");
  const [threadData, setThreadData] = useState<any>();
  const [postsData, setPostsData] = useState<any>();
  const [formIsActive, setFormIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const threadId = router.query.thread; // This gets the id of the thread which we can use to pull the data from the db for it
  const threadIdString = threadId as string;
  // TODO: fetch thread data and destructure it below
  // const { author, categories, date, members, title, posts, id, body } =
  //   mockThread;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("user id", uid);
        setUserEmail(user.email);
        // ...
      } else {
        // User is signed out
        // ...
        console.log("no user");
      }
    });
  }, []);

  async function getThread(db: any) {
    if (typeof threadId !== "string") {
      return;
    }
    const docRef = doc(db, "threads", threadIdString);
    const threadSnapshot = await getDoc(docRef);
    console.log(threadSnapshot);
    if (threadSnapshot.exists()) {
      console.log("here");
      const threadDataT = threadSnapshot.data();
      if (threadDataT.posts.length !== 0) {
        try {
          const posts = await getPosts(db, threadDataT.posts);
          setPostsData(posts);
          console.log("posts loaded");
        } catch (error) {
          console.log(error);
        }
      }
      return threadDataT;
    } else {
      console.log("No such document exists");
      return;
    }
  }

  async function getPosts(db: any, uids: string[]) {
    //  const refs = uids.map((id) => doc(db, "posts", id));
    //  const postsSnapshot = await getDocs(collection(db, "posts", ));

    const q = query(
      collection(db, "posts"),
      where(documentId(), "in", [...uids])
    );

    const postsSnapshot = await getDocs(q);
    const postList = postsSnapshot.docs.map((doc) => doc.data());
    return postList;
  }

  useEffect(() => {
    const getThreadData = async () => {
      const tData = await getThread(db);
      setThreadData(tData);
    };
    getThreadData();
  }, []);

  async function getThreadPosts(db: any) {}

  const handleNewPost = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    if (userEmail === "") {
      router.push("/login");
    }

    const rawCategories = event.target.postCategories.value;
    const arrCategories = rawCategories.split(",");
    const formattedCategories = arrCategories.map((category: string) =>
      category.trim()
    );

    const newDate = new Date();
    const formattedDate = `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
    const formattedTime = `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;

    const formData = {
      title: event.target.postTitle.value,
      body: event.target.postBody.value,
      image: event.target.postImage.value,
      categories: formattedCategories,
      isFeatured: false,
      isTopThree: false,
      isHotTrending: false,
      members: 1,
      author: userEmail,
      date: formattedDate,
      comments: [],
      upvotes: 0,
      downvotes: 0,
      views: 0,
    };

    try {
      // const docRef = await addDoc(collection(db, "threads"), formData);
      const newPostDocRef = doc(collection(db, "posts"));
      await setDoc(newPostDocRef, { ...formData, docId: newPostDocRef.id });
      console.log("success");
      try {
        const threadDocRef = doc(db, "threads", threadData.docId);
        await setDoc(
          threadDocRef,
          {
            ...threadData,
            posts: [...threadData.posts, newPostDocRef.id],
          },
          { merge: true }
        );
        console.log("added post id to thread");
        try {
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
      router.push(`/threads/${threadData.docId}/posts/${newPostDocRef.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {typeof threadData !== "undefined" ? (
        <div className={styles.infoBox}>
          <h2 className={styles.title}>{threadData.title}</h2>
          <Chips
            categories={[]}
            regime="auto"
            color="var(--tertiary-forum-color)"
            bgColor="var(--fifth-forum-color)"
          />
          <div className={styles.rightThreadSide}>
            <h4 className={styles.author}>{threadData.author}</h4>
            <h4 className={styles.date}>{threadData.date}</h4>
          </div>
          <div className={styles.rightThreadSide}>
            <svg style={{ width: "36px", height: "36px" }} viewBox="0 0 24 24">
              <path
                fill="#403103"
                d="M19 17V19H7V17S7 13 13 13 19 17 19 17M16 8A3 3 0 1 0 13 11A3 3 0 0 0 16 8M19.2 13.06A5.6 5.6 0 0 1 21 17V19H24V17S24 13.55 19.2 13.06M18 5A2.91 2.91 0 0 0 17.11 5.14A5 5 0 0 1 17.11 10.86A2.91 2.91 0 0 0 18 11A3 3 0 0 0 18 5M8 10H5V7H3V10H0V12H3V15H5V12H8Z"
              />
            </svg>
            <h4 className={styles.members}>
              {formatLargeNumbersWithCommas(threadData.members)}
            </h4>
          </div>
          <h3 className={styles.body}>{threadData.body}</h3>
        </div>
      ) : null}
      <div
        className={styles.addNew}
        onClick={() => setFormIsActive(!formIsActive)}
      >
        <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
          <path
            className={styles.path}
            d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
          />
        </svg>
        <span>Create New Post</span>
      </div>
      {formIsActive ? (
        <div className={styles.newThreadFormContainer}>
          <form onSubmit={handleNewPost} className={styles.newThreadForm}>
            <input
              className={styles.formInput}
              type="text"
              id="postTitle"
              name="postTitle"
              placeholder="Title"
              minLength={3}
              maxLength={255}
              required
            />
            <textarea
              className={styles.formTextarea}
              name="postBody"
              id="postBody"
              placeholder="Body"
              cols={30}
              rows={10}
            ></textarea>
            <input
              className={styles.formInput}
              type="text"
              id="postImage"
              name="postImage"
              placeholder="Image URL"
              required
            />
            <input
              className={styles.formInput}
              type="text"
              id="postCategories"
              name="postCategories"
              placeholder="Categories (comma separated)"
              required
            />
            <button
              type="submit"
              className={styles.formBtn}
              disabled={isLoading}
            >
              Add New Post
            </button>
          </form>
        </div>
      ) : null}
      <SearchBar placeholder="Search for posts..." />
      {threadData !== "" &&
      typeof threadData !== "undefined" &&
      typeof threadData !== null ? (
        <div>
          {postsData.map((post: PostData) => (
            <Link
              href={"/threads/" + threadId + "/posts/" + post.id}
              key={post.id}
            >
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
      ) : null}
    </div>
  );
};

export default Thread;
