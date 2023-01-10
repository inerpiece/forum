import Author from "../../../../../components/Author";
import Chips from "../../../../../components/Chips";
import {
  formatNumbers,
  PostData,
} from "../../../../../components/Posts/PostPreview";
import styles from "../../../../../styles/Post.module.css";
import { useState } from "react";
import Comment from "../../../../../components/Comments/Comment";

const mockPostOne: PostData = {
  id: "124",
  author: "Bo",
  body: "Yall this might work",
  categories: ["fafb", "bruh", "a", "b", "c", "d"],
  comments: [
    { author: "Bo", body: "First comment", upvotes: 20, downvotes: 3 },
    {
      author: "Jo",
      body: "Second comment Second comment Second comment Second comment Second comment Second comment Second comment Second commentSecond commentvvSecond commentSecond commentSecond commentSecond comment",
      upvotes: 30,
      downvotes: 4,
    },
  ],
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
  const [commentBoxIsVisible, setCommentBoxIsVisible] = useState(false);
  const {
    title,
    body,
    date,
    downvotes,
    upvotes,
    isFeatured,
    isHotTrending,
    comments,
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
      {/* ACTION BAR BELOW */}
      <div className={styles.actionBar}>
        <div className={styles.actionBarLeftSide}>
          <div className={styles.upvoteContainer}>
            <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
              <path
                className={styles.path}
                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
              />
            </svg>
            <span className={styles.actionBarUpvotes}>
              {formatNumbers(upvotes)}
            </span>
          </div>
          <div className={styles.downvoteContainer}>
            <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
              <path className={styles.path} d="M19,13H5V11H19V13Z" />
            </svg>
            <span className={styles.actionBarDownvotes}>
              {formatNumbers(downvotes)}
            </span>
          </div>
        </div>
        <div className={styles.actionBarRightSide}>
          <div>
            <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
              <path
                className={styles.path}
                d="M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z"
              />
            </svg>
            {isHotTrending ? (
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
            <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
              <path
                className={styles.path}
                d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
              />
            </svg>
          </div>
          <div>
            <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
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
            <svg style={{ width: "20px", height: "20px" }} viewBox="0 0 24 24">
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
          <form onSubmit={() => {}} className={styles.commentBox}>
            <textarea
              className={styles.commentTextArea}
              name="comment"
              id="comment"
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
      {comments?.map((comment, index) => (
        <Comment
          author={comment.author}
          body={comment.body}
          downvotes={comment.downvotes}
          upvotes={comment.upvotes}
          key={index}
        />
      ))}
    </div>
  );
};

export default Post;
