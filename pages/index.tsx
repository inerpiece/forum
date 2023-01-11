import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  DocumentData,
} from "firebase/firestore/lite";
import { initFirebase } from "../db/index";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThreadPreview, { ThreadData } from "../components/Threads/ThreadPreview";
import SearchBar from "../components/SearchBar";
import PostPreview from "../components/Posts/PostPreview";
import ImportantThreadsContainer from "../components/Threads/ImportantThreadsContainer";

const app = initFirebase();

const db = getFirestore(app);

const auth = getAuth(app);

// console.log("auth", auth);
// console.log("currUser", auth.currentUser);

// TODO: create login form [extract data from form and put into signInWithEmailAndPassword funcs and other for signup]
// TODO: create signup form
// TODO: create logout func

// getThreads(db);

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userEmail, setUserEmail] = useState<string | null>("");
  const [allThreads, setAllThreads] = useState<any[] | undefined>();

  async function getThreads(db: any) {
    const threadsCol = collection(db, "threads");
    const threadSnapshot = await getDocs(threadsCol);
    const threadList = threadSnapshot.docs.map((doc) => doc.data());
    console.log(threadList);
    return threadList;
  }

  useEffect(() => {
    const getAllT = async () => {
      const allT = await getThreads(db);
      setAllThreads(allT);
    };
    getAllT();
  }, []);

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

  const [burgerMenuIsVisible, setBurgerMenuIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formIsActive, setFormIsActive] = useState(false);
  const router = useRouter();
  const handleSignOut = () => {
    // signOut(auth)
    //   .then(() => {
    //     // Sign-out successful.
    //     router.push("/");
    //   })
    //   .catch((error) => {
    //     // An error happened.
    //     console.log(error);
    //   });
  };

  const handleNewThread = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    if (userEmail === "") {
      router.push("/login");
    }

    const rawCategories = event.target.threadCategories.value;
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
      title: event.target.threadTitle.value,
      body: event.target.threadBody.value,
      image: event.target.threadImage.value,
      categories: formattedCategories,
      isFeatured: false,
      isTopThree: false,
      isHotTrending: false,
      members: 1,
      author: userEmail,
      posts: [],
      date: formattedDate,
    };

    try {
      // const docRef = await addDoc(collection(db, "threads"), formData);
      const newThreadDocRef = doc(collection(db, "threads"));
      await setDoc(newThreadDocRef, { ...formData, docId: newThreadDocRef.id });
      console.log("success");
      router.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
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
        <span>Create New Thread</span>
      </div>
      {formIsActive ? (
        <div className={styles.newThreadFormContainer}>
          <form onSubmit={handleNewThread} className={styles.newThreadForm}>
            <input
              className={styles.formInput}
              type="text"
              id="threadTitle"
              name="threadTitle"
              placeholder="Title"
              minLength={3}
              maxLength={255}
              required
            />
            <textarea
              className={styles.formTextarea}
              name="threadBody"
              id="threadBody"
              placeholder="Body"
              cols={30}
              rows={10}
            ></textarea>
            <input
              className={styles.formInput}
              type="text"
              id="threadImage"
              name="threadImage"
              placeholder="Image URL"
              required
            />
            <input
              className={styles.formInput}
              type="text"
              id="threadCategories"
              name="threadCategories"
              placeholder="Categories (comma separated)"
              required
            />
            <button
              type="submit"
              className={styles.formBtn}
              disabled={isLoading}
            >
              Add New Thread
            </button>
          </form>
        </div>
      ) : null}
      <SearchBar placeholder="Search for threads..." />
      <ImportantThreadsContainer label={"Top 3"} content={"top"} />
      <ImportantThreadsContainer label={"Hot/Trending"} content={"trending"} />
      {allThreads?.map((thread) => (
        <ThreadPreview
          key={thread.docId}
          author={thread.author}
          categories={thread.categories}
          date={thread.date}
          id={thread.docId}
          members={thread.members}
          title={thread.title}
          body={thread.body}
          image={thread.image}
          isFeatured={thread.isFeatured}
          isTopThree={thread.isTopThree}
          isHotTrending={thread.isHotTrending}
          posts={thread.posts}
        />
      ))}
      {/* <ThreadPreview
        id="123"
        posts={[]}
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
        id="124"
        posts={[]}
        author="Jane"
        date="32/23/23"
        isFeatured={true}
        isHotTrending={false}
        isTopThree={false}
        members={4020000000}
        image="asd"
        title={"Welcome to the first thread"}
        categories={["fast", "cars"]}
      /> */}
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
