import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Debug 
    console.log(
      `Form submitted with values ${username}, ${password}, ${password2}`
    );
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Confirm password"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
        ></input>
        <input type="submit" value="Register"></input>
      </form>
    </>
  );
}
