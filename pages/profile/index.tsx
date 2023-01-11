import styles from "../../styles/Profile.module.css";
import { useEffect, useState } from "react";
import Author from "../../components/Author";
import SearchBar from "../../components/SearchBar";
import PostPreview, { PostData } from "../../components/Posts/PostPreview";
import ThreadPreview, {
  ThreadData,
} from "../../components/Threads/ThreadPreview";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { initFirebase } from "../../db";
import { getFirestore } from "firebase/firestore/lite";
import { useRouter } from "next/router";

interface ProfilePages {
  pageName: "friends" | "threads" | "posts" | "chat";
}

const userFriends = [
  { username: "Mo", score: 452 },
  { username: "Shmo", score: 455 },
  { username: "Jo", score: 451 },
]; // This will be a list of friends from the db
// TODO: pull friends from db based on uid

const mockPostOne: PostData = {
  docId: "124",
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
  docId: "125",
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
  docId: "126",
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

const mockArrThreads = [mockThread];

const app = initFirebase();

const db = getFirestore(app);

const auth = getAuth(app);

const Profile = () => {
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  const [profileIsExpanded, setProfileIsExpanded] = useState(true);
  const [pageName, setPageName] = useState("friends");
  return (
    <div>
      <div className={styles.container}>
        {!profileIsExpanded ? (
          <div
            onClick={() => setProfileIsExpanded(!profileIsExpanded)}
            className={styles.collapsedProfile}
          >
            <div className={styles.collapsedUsername}>
              {auth.currentUser ? auth.currentUser.email : "No user"}
            </div>
            <svg
              className={styles.icon}
              style={{ width: "20px", height: "20px" }}
              viewBox="0 0 24 24"
            >
              <path
                className={styles.path}
                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
              />
            </svg>
          </div>
        ) : null}
        {profileIsExpanded ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setProfileIsExpanded(!profileIsExpanded);
            }}
            className={styles.expandedProfile}
          >
            <svg
              className={styles.expandedIcon}
              style={{ width: "20px", height: "20px" }}
              viewBox="0 0 24 24"
            >
              <path
                className={styles.path}
                d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
              />
            </svg>
            <div className={styles.largeProfileContainer}>
              <div className={styles.userAvatar}>
                <svg
                  style={{ width: "60px", height: "60px" }}
                  viewBox="0 0 24 24"
                >
                  <path
                    className={styles.path}
                    d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                  />
                </svg>
              </div>
              <div className={styles.expandedUsername}>
                {auth.currentUser ? auth.currentUser.email : "No user"}
              </div>
            </div>
            <div className={styles.userStatsContainer}>
              <span className={styles.userScore}>Score: 300K</span>
              <span className={styles.userThreads}>Threads: 45</span>
              <span className={styles.userPosts}>Posts: 23</span>
              <span className={styles.userComments}>Comments: 25</span>
              {auth.currentUser ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                >
                  <svg
                    style={{ width: "30px", height: "30px" }}
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={styles.path}
                      d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        <div className={styles.navSectionContainer}>
          <div
            onClick={() => setPageName("friends")}
            className={
              pageName === "friends"
                ? styles.navSectionItemActive
                : styles.navSectionItem
            }
          >
            <h3>Friends</h3>
          </div>
          <div
            onClick={() => setPageName("posts")}
            className={
              pageName === "posts"
                ? styles.navSectionItemActive
                : styles.navSectionItem
            }
          >
            <h3>Posts</h3>
          </div>
          <div
            onClick={() => setPageName("threads")}
            className={
              pageName === "threads"
                ? styles.navSectionItemActive
                : styles.navSectionItem
            }
          >
            <h3>Threads</h3>
          </div>
          <div
            className={
              pageName === "chat"
                ? styles.navSectionItemActive
                : styles.navSectionItem
            }
          >
            <h3>Chat</h3>
          </div>
        </div>
      </div>
      {/* Friends Page --- Below */}
      {pageName === "friends" ? (
        <div className={styles.friendsPageContainer}>
          <SearchBar placeholder="Add new friends..." />
          {userFriends.map((friend, index) => (
            <Author
              username={friend.username}
              score={friend.score}
              key={index}
            />
          ))}
        </div>
      ) : null}
      {/* Favorite Posts Page --- Below */}
      {pageName === "posts" ? (
        <div className={styles.postsPageContainer}>
          {mockArrPosts.map((post, index) => (
            <PostPreview
              author={post.author}
              body={post.body}
              categories={post.categories}
              date={post.date}
              downvotes={post.downvotes}
              title={post.title}
              upvotes={post.upvotes}
              views={post.views}
              docId={post.docId}
              key={index}
            />
          ))}
        </div>
      ) : null}
      {/* Favorite Threads Page --- Below */}
      {pageName === "threads" ? (
        <div className={styles.threadsPageContainer}>
          {mockArrThreads.map((thread, index) => (
            <ThreadPreview
              author={thread.author}
              members={thread.members}
              body={thread.body}
              categories={thread.categories}
              date={thread.date}
              title={thread.title}
              id={thread.id}
              key={index}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
