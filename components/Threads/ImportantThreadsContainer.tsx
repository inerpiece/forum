import styles from "../../styles/ImportantThreadsContainer.module.css";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { ThreadData } from "./ThreadPreview";
import ThreadPreview from "./ThreadPreview";
import { NextPage } from "next";

const threadOne: ThreadData = {
  author: "John",
  members: 40,
  date: "13/13/13",
  categories: ["cars", "fast"],
  title: "Is this working?",
  isFeatured: true,
};

const threadTwo: ThreadData = {
  author: "Alice",
  members: 50,
  date: "13/12/13",
  categories: ["cars", "gg"],
  title: "Will it work",
  isFeatured: true,
};

const threadThree: ThreadData = {
  author: "John",
  members: 60,
  date: "13/11/13",
  categories: ["cars", "wp"],
  title: "It has to...",
  isFeatured: true,
};

interface ContainerData {
  label: string;
  content: "top" | "trending";
}

const topThree = [threadOne, threadTwo, threadThree];
const trending = [threadThree, threadOne, threadTwo];

const ImportantThreadsContainer = (containerData: ContainerData) => {
  const { label, content } = containerData;
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div>
      {!isExpanded ? (
        <div className={styles.collapsedContainer}>
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.collapsed}
          >
            <h3 className={styles.collapsedLabel}>Reveal {label}</h3>
            <svg
              className={styles.collapsedIcon}
              style={{ width: "24px", height: "24px" }}
              viewBox="0 0 24 24"
            >
              <path
                className={styles.path}
                d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
              />
            </svg>
          </div>
        </div>
      ) : null}
      {isExpanded ? (
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.expandedContainer}
        >
          <div className={styles.collapsed}>
            <h3 className={styles.collapsedLabel}>Hide {label}</h3>
            <svg
              className={styles.collapsedIcon}
              style={{ width: "24px", height: "24px" }}
              viewBox="0 0 24 24"
            >
              <path
                className={styles.path}
                d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
              />
            </svg>
          </div>
          {content === "top" ? (
            <div className={styles.threadsContainer}>
              {topThree.map((thread: ThreadData, index) => (
                <ThreadPreview
                  key={index}
                  author={thread.author}
                  categories={thread.categories}
                  date={thread.date}
                  members={thread.members}
                  title={thread.title}
                  isFeatured={thread.isFeatured}
                />
              ))}
            </div>
          ) : content === "trending" ? (
            <div className={styles.threadsContainer}>
              {trending.map((thread: ThreadData) => (
                <ThreadPreview
                  author={thread.author}
                  categories={thread.categories}
                  date={thread.date}
                  members={thread.members}
                  title={thread.title}
                  isFeatured={thread.isFeatured}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ImportantThreadsContainer;
