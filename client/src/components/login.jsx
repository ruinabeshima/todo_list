import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    // Prevent refresh
    event.preventDefault();

    try {
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
      if (!response.ok) {
        const data = await response.json();
        console.log("Login failed: ", data.error);
        return;
      }

      const data = await response.json();
      console.log("Login succeeded", data);

      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <div className="navbar">
        <Link className=" btn btn-ghost text-xl" to="/">
          ToDoInc
        </Link>
      </div>

      <div>
        <h1 className="text-3xl mt-10">Login</h1>
      </div>

      <div className="mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5"
        >
          <div className="flex flex-col gap-1">
            <label for="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="input w-80"
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input w-80"
            ></input>
          </div>
          <p>
            Don't have an account? {" "}
            <Link to="/register">
              <a className="link link-secondary">Click me</a>
            </Link>
          </p>
          <div className="pt-5">
            <button className="btn btn-accent w-22" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
