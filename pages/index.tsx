import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { initFirebase } from "../db/index";

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import ThreadPreview, { ThreadData } from "../components/Threads/ThreadPreview";
import SearchBar from "../components/SearchBar";
import PostPreview from "../components/Posts/PostPreview";
import ImportantThreadsContainer from "../components/Threads/ImportantThreadsContainer";

// const app = initFirebase();

// const db = getFirestore(app);

// const auth = getAuth(app);

// console.log("auth", auth);
// console.log("currUser", auth.currentUser);

async function getThreads(db: any) {
  const threadsCol = collection(db, "threads");
  const threadSnapshot = await getDocs(threadsCol);
  const threadList = threadSnapshot.docs.map((doc) => doc.data());
  console.log(threadList);
  return threadList;
}

// TODO: create login form [extract data from form and put into signInWithEmailAndPassword funcs and other for signup]
// TODO: create signup form
// TODO: create logout func

// getThreads(db);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [burgerMenuIsVisible, setBurgerMenuIsVisible] = useState(false);
  const router = useRouter();
  // const handleSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       router.push("/");
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       console.log(error);
  //     });
  // };

  console.log(burgerMenuIsVisible);

  return (
    <div className={styles.container}>
      <div>
        <header>
          <nav className={styles.mainNavigation}>
            <div
              className={styles.burgerMenu}
              onClick={() => setBurgerMenuIsVisible(!burgerMenuIsVisible)}
            >
              <svg
                style={{ width: "48px", height: "48px" }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
                />
              </svg>
            </div>
            <h1>Title</h1>
            <Link href={"/profile"}>
              <div className={styles.userAvatar}>
                <svg
                  style={{ width: "36px", height: "36px" }}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                  />
                </svg>
              </div>
            </Link>
          </nav>

          <ul
            className={
              burgerMenuIsVisible
                ? styles.navigationMenuVisible
                : styles.navigationMenuHidden
            }
          >
            <Link href={"/profile"}>
              <li className={styles.navList}>Profile</li>
            </Link>
            <Link href={"/login"}>
              <li className={styles.navList}>Login</li>
            </Link>
            <Link href={"/signup"}>
              <li className={styles.navList}>Sign Up</li>
            </Link>
            <Link href={"/options"}>
              <li className={styles.navList}>Options</li>
            </Link>
          </ul>
          {burgerMenuIsVisible ? (
            <div
              onClick={() => setBurgerMenuIsVisible(false)}
              className={styles.navMantle}
            ></div>
          ) : null}
        </header>
      </div>
      <div className={styles.navBufferForFirstElement}></div>
      <SearchBar />
      <ImportantThreadsContainer label={"Top 3"} content={"top"} />
      <ImportantThreadsContainer label={"Hot/Trending"} content={"trending"} />
      <PostPreview
        author="Doe"
        body="Lorem ipsum dilore..."
        comments=""
        date="13/13/13"
        downvotes={40}
        image=""
        isFeatured={true}
        isHotTrending={false}
        isTopThree={false}
        title="This is it. How to brainwash yourself."
        upvotes={4002}
        views={130420}
        categories={[
          "fast",
          "cars",
          "fast",
          "cars",
          "fast",
          "cars",
          "fast",
          "cars",
          "fast",
          "cars",
          "fast",
          "cars",
        ]}
      />
      <ThreadPreview
        posts=""
        author="Jane"
        date="32/23/23"
        isFeatured={false}
        isHotTrending={false}
        isTopThree={false}
        members={4020000}
        image="asd"
        title={"Welcome to the first thread"}
        categories={[
          "fast",
          "cars",
          "fast",
          "cars",
          "fast",
          "cars",
          "fast",
          "cars",
          "fast",
          "cars",
          "fast",
          "cars",
        ]}
      />
      <ThreadPreview
        posts=""
        author="Jane"
        date="32/23/23"
        isFeatured={true}
        isHotTrending={false}
        isTopThree={false}
        members={4020000000}
        image="asd"
        title={"Welcome to the first thread"}
        categories={["fast", "cars"]}
      />
    </div>

    // <>
    //   <Head>
    //     <title>Create Next App</title>
    //     <meta name="description" content="Generated by create next app" />
    //     <meta name="viewport" content="width=device-width, initial-scale=1" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>
    //   <main className={styles.main}>
    //     <div className={styles.description}>
    //       <p>
    //         Get started by editing&nbsp;
    //         <code className={styles.code}>pages/index.tsx</code>
    //       </p>
    //       <div>
    //         <a
    //           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           By{' '}
    //           <Image
    //             src="/vercel.svg"
    //             alt="Vercel Logo"
    //             className={styles.vercelLogo}
    //             width={100}
    //             height={24}
    //             priority
    //           />
    //         </a>
    //       </div>
    //     </div>

    //     <div className={styles.center}>
    //       <Image
    //         className={styles.logo}
    //         src="/next.svg"
    //         alt="Next.js Logo"
    //         width={180}
    //         height={37}
    //         priority
    //       />
    //       <div className={styles.thirteen}>
    //         <Image
    //           src="/thirteen.svg"
    //           alt="13"
    //           width={40}
    //           height={31}
    //           priority
    //         />
    //       </div>
    //     </div>

    //     <div className={styles.grid}>
    //       <a
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //         className={styles.card}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <h2 className={inter.className}>
    //           Docs <span>-&gt;</span>
    //         </h2>
    //         <p className={inter.className}>
    //           Find in-depth information about Next.js features and&nbsp;API.
    //         </p>
    //       </a>

    //       <a
    //         href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //         className={styles.card}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <h2 className={inter.className}>
    //           Learn <span>-&gt;</span>
    //         </h2>
    //         <p className={inter.className}>
    //           Learn about Next.js in an interactive course with&nbsp;quizzes!
    //         </p>
    //       </a>

    //       <a
    //         href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //         className={styles.card}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <h2 className={inter.className}>
    //           Templates <span>-&gt;</span>
    //         </h2>
    //         <p className={inter.className}>
    //           Discover and deploy boilerplate example Next.js&nbsp;projects.
    //         </p>
    //       </a>

    //       <a
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //         className={styles.card}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <h2 className={inter.className}>
    //           Deploy <span>-&gt;</span>
    //         </h2>
    //         <p className={inter.className}>
    //           Instantly deploy your Next.js site to a shareable URL
    //           with&nbsp;Vercel.
    //         </p>
    //       </a>
    //     </div>
    //   </main>
    // </>
  );
}
