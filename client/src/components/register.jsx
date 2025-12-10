import { useState } from "react";
import styles from "../styles/register.module.css";
import { useNavigate } from "react-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    // Prevent refresh
    event.preventDefault();

    // Send POST request to /auth/register
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password2,
      }),
    });

    // Handle response 
    const data = await response.json() 
    if (!response.ok){
      console.log("Register failed: ", data.error)
      return; 
    }

    console.log("Register succeeded")
    navigate("/login")
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
      </form>
    </>
  );
}
