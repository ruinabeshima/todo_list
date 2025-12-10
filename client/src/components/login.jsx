import { useState } from "react";
import styles from "../styles/login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted!")
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label for="username">Username</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <label for="password">Password</label>
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <input type="submit" value="Login" className={styles.submit}></input>
      </form>
    </>
  );
}
