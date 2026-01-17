import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(3);

  useEffect(() => {
    const handleData = async () => {
      const response = await fetch("http://localhost:8080/notes/add", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        navigate("/login");
      }

      const data = await response.json();
      console.log(data);
    };

    handleData();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/notes/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority: Number(priority),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        console.error("Todo failed:", data);
        return;
      }

      const data = await response.json();
      console.log("Add todo succeeded");
      console.log(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Todo request error: ", error);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-5">
      <nav>
        <button
          className="btn btn-ghost text-xl"
          onClick={() => navigate("/dashboard")}
        >
          ToDoInc
        </button>
      </nav>
      <h1 className="text-3xl font-bold">Add Todo</h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Add a task</legend>

          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            className="input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>

          <label htmlFor="description">Description</label>
          <textarea
            className="textarea"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>

          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(event) => setPriority(Number(event.target.value))}
            className="select"
          >
            <option value={3}>High</option>
            <option value={2}>Medium</option>
            <option value={1}>Low</option>
          </select>

          <input
            type="submit"
            value="Add"
            className="btn btn-primary mt-4"
          ></input>
        </fieldset>
      </form>
    </div>
  );
}
