import Author from "../Author";
import styles from "../../styles/Comment.module.css";
import { formatNumbers } from "../Posts/PostPreview";
import { useState } from "react";

interface CommentData {
  author: string;
  body: string;
  upvotes: number;
  downvotes: number;
}

const Comment = (props: CommentData) => {
  const [commentBoxIsVisible, setCommentBoxIsVisible] = useState(false);
  return (
    <div className={styles.mainContainer}>
      <Author username={props.author} score={20} />
      <div className={styles.container}>
        <div className={styles.body}>{props.body}</div>
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
                {formatNumbers(props.upvotes)}
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
                {formatNumbers(props.downvotes)}
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
                  d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
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
      </div>
    </div>
  );
};

export default Comment;
