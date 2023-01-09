import "../styles/globals.css";
import type { AppProps } from "next/app";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // ------------
  // The code block below allows for extracting the name and capitilizing the first letter of the route
  // It is then used as the navigation title in the tsx template
  const splitter = router.asPath.split("/");
  const splLen = splitter[splitter.length - 1];
  const navTitle = splLen
    ? splLen.charAt(0).toUpperCase() + splLen.slice(1, splLen.length)
    : "Home";
  // ------------
  const [burgerMenuIsVisible, setBurgerMenuIsVisible] = useState(false);
  // The below use effect allows for the menu to be automatically closed if the route changes (if a user clicks on of the listed options in the menu)
  useEffect(() => {
    setBurgerMenuIsVisible(false);
  }, [router.asPath]);
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
            <h1>{navTitle}</h1>
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
            <Link href={"/"}>
              <li className={styles.navList}>Home</li>
            </Link>
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
      {/* The below renders the pages, while the above makes it that the menu is visible across all pages without having to repeat code */}
      <Component {...pageProps} />
    </div>
  );
}
