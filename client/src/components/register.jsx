import { useState } from "react";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    async function handleData() {
      // Debug
      console.log(
        `Form submitted with values ${username}, ${password}, ${password2}`
      );

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

        const data = await response.json()
        console.log(data)
      } catch (error) {
        setErrorMessage(error.message)

        //Debug
        console.log(error.message);
      }
    }

    handleData();
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

        {errorMessage && (
          <p>{errorMessage}</p>
        )}
      </form>
    </>
  );
}
