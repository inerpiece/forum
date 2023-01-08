import styles from "../../styles/Home.module.css";

function Home() {
  return (
    <div>
      <header>
        <nav>
          <div className={styles.burgerMenu}>
            <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
              />
            </svg>
          </div>
          <h1>Title</h1>
          <div>
            <img src="" alt="" />
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Home;
