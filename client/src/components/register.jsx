import { useState } from "react";
import styles from "../styles/register.module.css";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    async function handleData() {

      try {
        const response = await fetch("http://localhost:8080/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            password2: password2,
          }),
        });

        if (!response.ok) {
          throw new Error(`Reponse status = ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        setErrorMessage(error.message);

        //Debug
        console.log(error.message);
      }
    }

    handleData();
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p className={styles.required}> = Required</p>
        <label for="username">
          Username<span className={styles.required}>*</span>
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className={styles.input}
        ></input>
        <label for="password">
          Password<span className={styles.required}>*</span>
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={styles.input}
        ></input>
        <label for="password2">
          Confirm Password<span className={styles.required}>*</span>
        </label>
        <input
          id="password2"
          type="password"
          placeholder="Confirm password"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
          className={styles.input}
        ></input>
        <input type="submit" value="Register"></input>

        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </>
  );
}
