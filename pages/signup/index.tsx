import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initFirebase } from "../../db";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.css";
import Link from "next/link";

const app = initFirebase();

const auth = getAuth(app);
function Signup() {
  const router = useRouter();
  const [errorMessagePassword, setErrorMessagePassword] = useState<string>();
  const [errorMessageEmail, setErrorMessageEmail] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSignUp = async (event: any) => {
    event.preventDefault();

    setErrorMessageEmail("");
    setErrorMessagePassword("");

    const pw = event.target.userPassword.value;
    console.log("pw", pw);
    const checkedPassword =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        event.target.userPassword.value
      );
    const checkedEmail = /.+\@.+\..+/.test(event.target.userEmail.value);
    console.log("cp", checkedPassword);

    if (!checkedEmail) {
      setErrorMessageEmail("Must be a valid email address.");
      return;
    }

    if (!checkedPassword) {
      setErrorMessagePassword(
        "*Password must be at least 8 characters long. It must contain at least one upper case letter, one lower case letter, one digit, and one special character."
      );
      return;
    }

    const data = {
      email: event.target.userEmail.value.trim(),
      password: event.target.userPassword.value,
    };

    try {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log("success creating user, user: ", user);
          router.push("/");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setErrorMessage("Email already in use.");
          } else {
            setErrorMessage(
              "There was a problem creating your account. Please try again later. Problem: " +
                error.message
            );
          }
          // ..
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <form onSubmit={handleSignUp} className={styles.loginForm}>
        <input
          type="text"
          id="userEmail"
          name="userEmail"
          placeholder="Email"
        />
        {errorMessageEmail !== "" ? (
          <div className={styles.errorMessage}>{errorMessageEmail}</div>
        ) : null}
        <input
          type="text"
          id="userPassword"
          name="userPassword"
          placeholder="Password"
        />
        {errorMessagePassword !== "" ? (
          <div className={styles.errorMessage}>{errorMessagePassword}</div>
        ) : null}
        <button type="submit">Sign Up</button>
        {errorMessage !== "" ? (
          <div className={styles.errorMessage}>{errorMessage}</div>
        ) : null}
        <div className={styles.loginInstead}>
          Already have an account?{" "}
          <Link href={"/login"}>
            <span className={styles.loginLabel}>Login</span>
          </Link>{" "}
          instead.
        </div>
      </form>
    </div>
  );
}

export default Signup;
