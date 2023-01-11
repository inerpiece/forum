import Author from "../../../../../components/Author";
import Chips from "../../../../../components/Chips";
import {
  formatNumbers,
  PostData,
} from "../../../../../components/Posts/PostPreview";
import styles from "../../../../../styles/Post.module.css";
import { useEffect, useState } from "react";
import Comment from "../../../../../components/Comments/Comment";
import { useRouter } from "next/router";
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
import { initFirebase } from "../../../../../db";
import { getAuth } from "firebase/auth";

const app = initFirebase();

const db = getFirestore(app);

const auth = getAuth(app);

const Post = () => {
  const router = useRouter();
  console.log("router.asPath", router.asPath);
  const [commentBoxIsVisible, setCommentBoxIsVisible] = useState(false);
  const postId = router.query.post;
  console.log("postId", postId);
  const postIdString = postId as string;
  const [commentsData, setCommentsData] = useState<any>();
  const [postData, setPostData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  async function getPost(db: any) {
    if (typeof postId !== "string") {
      return;
    }
    const docRef = doc(db, "posts", postIdString);
    const postSnapshot = await getDoc(docRef);
    console.log(postSnapshot);
    if (postSnapshot.exists()) {
      console.log("here");
      const postDataP = postSnapshot.data();
      if (postDataP.comments.length !== 0) {
        try {
          const comments = await getComments(db, postDataP.comments);
          setCommentsData(comments);
          console.log("comments loaded");
        } catch (error) {
          console.log(error);
        }
      }
      return postDataP;
    } else {
      console.log("No such document exists");
      return;
    }
  }

  async function getComments(db: any, uids: string[]) {
    //  const refs = uids.map((id) => doc(db, "posts", id));
    //  const postsSnapshot = await getDocs(collection(db, "posts", ));

    const q = query(
      collection(db, "comments"),
      where(documentId(), "in", [...uids])
    );

    const commentsSnapshot = await getDocs(q);
    const commentsList = commentsSnapshot.docs.map((doc) => doc.data());
    return commentsList;
  }

  const handleNewComment = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    if (!auth.currentUser) {
      router.push("/login");
      return;
    }

    const newDate = new Date();
    const formattedDate = `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
    const formattedTime = `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;

    const formData = {
      body: event.target.commentBody.value,
      author: auth.currentUser.email,
      date: formattedDate,
      upvotes: 0,
      downvotes: 0,
    };

    try {
      const newCommentDocRef = doc(collection(db, "comments"));
      await setDoc(newCommentDocRef, {
        ...formData,
        docId: newCommentDocRef.id,
      });
      console.log("success");
      try {
        const postDocRef = doc(db, "posts", postData.docId);
        await setDoc(
          postDocRef,
          {
            ...postData,
            comments: [...postData.comments, newCommentDocRef.id],
          },
          { merge: true }
        );
        console.log("added comment id to post");
      } catch (error) {
        console.log(error);
      }
      setCommentBoxIsVisible(false);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getPostData = async () => {
      const pData = await getPost(db);
      setPostData(pData);
    };
    getPostData();
  }, []);

  return (
    <div>
      {typeof postData !== "undefined" ? (
        <div>
          <h2 className={styles.title}>{postData.title}</h2>
          <Chips
            categories={postData.categories}
            regime="auto"
            color="var(--fifth-forum-color)"
            bgColor="var(--forth-forum-color)"
          />
          <Author username={postData.author} score={300_000} />
          <h3 className={styles.date}>{postData.date}</h3>
          {postData.isFeatured ? (
            <div className={styles.imgContainer}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Aspect_ratio_-_16x9.svg/2560px-Aspect_ratio_-_16x9.svg.png"
                alt=""
                className={styles.img}
              />
            </div>
          ) : null}
          <div className={styles.body}>{postData.body}</div>
          {/* ACTION BAR BELOW */}
          <div className={styles.actionBar}>
            <div className={styles.actionBarLeftSide}>
              <div className={styles.upvoteContainer}>
                <svg
                  style={{ width: "20px", height: "20px" }}
                  viewBox="0 0 24 24"
                >
                  <path
                    className={styles.path}
                    d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                  />
                </svg>
                <span className={styles.actionBarUpvotes}>
                  {formatNumbers(postData.upvotes)}
                </span>
              </div>
              <div className={styles.downvoteContainer}>
                <svg
                  style={{ width: "20px", height: "20px" }}
                  viewBox="0 0 24 24"
                >
                  <path className={styles.path} d="M19,13H5V11H19V13Z" />
                </svg>
                <span className={styles.actionBarDownvotes}>
                  {formatNumbers(postData.downvotes)}
                </span>
              </div>
            </div>
            <div className={styles.actionBarRightSide}>
              <div>
                <svg
                  style={{ width: "20px", height: "20px" }}
                  viewBox="0 0 24 24"
                >
                  <path
                    className={styles.path}
                    d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"
                  />
                </svg>
                {postData.isHotTrending ? (
                  <svg
                    style={{ width: "20px", height: "20px" }}
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={styles.path}
                      d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                    />
                  </svg>
                ) : null}
              </div>
              <div>
                <svg
                  style={{ width: "20px", height: "20px" }}
                  viewBox="0 0 24 24"
                >
                  <path
                    className={styles.path}
                    d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
                  />
                </svg>
              </div>
              <div>
                <svg
                  style={{ width: "20px", height: "20px" }}
                  viewBox="0 0 24 24"
                >
                  <path
                    className={styles.path}
                    d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"
                  />
                </svg>
              </div>
              <div
                onClick={() => {
                  setCommentBoxIsVisible(!commentBoxIsVisible);
                }}
              >
                <svg
                  style={{ width: "20px", height: "20px" }}
                  viewBox="0 0 24 24"
                >
                  <path
                    className={styles.path}
                    d="M10,9V5L3,12L10,19V14.9C15,14.9 18.5,16.5 21,20C20,15 17,10 10,9Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* ACTION BAR ABOVE */}
          {commentBoxIsVisible ? (
            <div>
              <form onSubmit={handleNewComment} className={styles.commentBox}>
                <textarea
                  className={styles.commentTextArea}
                  name="commentBody"
                  id="commentBody"
                  cols={30}
                  rows={10}
                  placeholder="Write your comment here..."
                ></textarea>
                <button className={styles.btn} type="submit">
                  <span className={styles.btnText}>Comment</span>
                </button>
              </form>
            </div>
          ) : null}
          {commentsData?.map((comment: any, index: any) => (
            <Comment
              author={comment.author}
              body={comment.body}
              downvotes={comment.downvotes}
              upvotes={comment.upvotes}
              key={index}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Post;
