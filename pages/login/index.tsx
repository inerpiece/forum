import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { initFirebase } from "../../db";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.css";
import Link from "next/link";

const app = initFirebase();

const auth = getAuth(app);
function Login() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSignIn = async (event: any) => {
    event.preventDefault();

    setErrorMessage("");

    const data = {
      email: event.target.userEmail.value,
      password: event.target.userPassword.value,
    };

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            console.log("success creating user, user: ", user);
            router.push("/");
          })
          .catch((error) => {
            setErrorMessage(
              "There was a problem logging into your account. Please try again later. Issue: " +
                error.message
            );
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className={styles.loginFormContainer}>
      <form onSubmit={handleSignIn} className={styles.loginForm}>
        <input
          type="text"
          id="userEmail"
          name="userEmail"
          placeholder="Email"
          defaultValue={userEmail}
        />
        <input
          type="text"
          id="userPassword"
          name="userPassword"
          placeholder="Password"
          defaultValue={userPassword}
        />
        <button type="submit">Login</button>
        {errorMessage !== "" ? <div>{errorMessage}</div> : null}
        <div className={styles.signupInstead}>
          Don't have an account?{" "}
          <Link href={"/signup"}>
            <span className={styles.signupLabel}>Sign Up</span>
          </Link>{" "}
          instead.
        </div>
      </form>
    </div>
  );
}

export default Login;
