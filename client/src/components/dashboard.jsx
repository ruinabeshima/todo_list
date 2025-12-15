import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const handleData = async () => {
      const response = await fetch("http://localhost:8080/notes/dashboard", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        navigate("/login");
      }

      const data = await response.json();
      setNotes(data.todos || []);
      console.log(data);
    };

    handleData();
  }, [navigate]);

  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/add">Add</Link>
      {notes.length === 0 ? (
        <p>No todos yet. Add one to get started!</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.todo_id}
          >
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <p>Priority: {note.priority}</p>
            <label>
              <input
                type="checkbox"
                checked={note.is_completed || false}
                onChange={() => {}}
                readOnly
              />
              Completed?
            </label>
          </div>
        ))
      )}
    </>
  );
}
