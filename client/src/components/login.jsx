import { useState } from "react";
import styles from "../styles/login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // Prevent refresh
    event.preventDefault();

    // Send POST requst to /auth/login
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // Handle response
    const data = await response.json();
    if (!response.ok) {
      console.log("Login failed: ", data.error);
      return;
    }

    console.log("Login succeeded");
    navigate("/register");
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
