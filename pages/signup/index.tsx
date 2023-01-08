import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initFirebase } from "../../db";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.css";

const app = initFirebase();

const auth = getAuth(app);
function Signup() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSignUp = async (event: any) => {
    event.preventDefault();

    const data = {
      email: event.target.userEmail.value,
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
          const errorCode = error.code;
          const errorMessage = error.message;
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
          defaultValue={userEmail}
        />
        <input
          type="text"
          id="userPassword"
          name="userPassword"
          placeholder="Password"
          defaultValue={userPassword}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
