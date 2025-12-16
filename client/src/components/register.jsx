import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

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
    const data = await response.json();
    if (!response.ok) {
      console.log("Register failed: ", data.error);
      return;
    }

    console.log("Register succeeded");
    navigate("/login");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <div className="navbar">
        <Link className=" btn btn-ghost text-xl" to="/">
          ToDoInc
        </Link>
      </div>

      <div>
        <h1 className="text-3xl mt-10">Register</h1>
      </div>

      <div className="mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5"
        >
          <div className="flex flex-col gap-1">
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="input w-80"
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input w-80"
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label for="password2">Confirm Password</label>
            <input
              id="password2"
              type="password"
              placeholder="Confirm password"
              value={password2}
              onChange={(event) => setPassword2(event.target.value)}
              className="input w-80"
            ></input>
          </div>
          <div className="pt-5">
            <button className="btn btn-accent w-22" type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
