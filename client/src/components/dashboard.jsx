import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [page, setPage] = useState(1);

  return (
    <>
      <button onClick={() => setPage(1)}>Incomplete</button>
      <button onClick={() => setPage(2)}>Complete</button>

      {page === 1 && <IncompleteNotes />}
      {page === 2 && <CompleteNotes />}
    </>
  );
}

function IncompleteNotes() {
  const [incompleteNotes, setIncompleteNotes] = useState([]);

  const navigate = useNavigate();
  const fetchIncomplete = useCallback(async () => {
    const response = await fetch(
      "http://localhost:8080/notes/dashboard-incomplete",
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      navigate("/login");
      return;
    }

    const data = await response.json();
    setIncompleteNotes(data.todos || []);
  }, [navigate]);

  useEffect(() => {
    fetchIncomplete();
  }, [fetchIncomplete]);

  const handleToggleCompletion = async (todo_id, currentStatus) => {
    const response = await fetch(
      "http://localhost:8080/notes/update-completion",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          todo_id,
          is_completed: !currentStatus,
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to update todo");
      return;
    }

    await fetchIncomplete();
  };

  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/add">Add</Link>
      {incompleteNotes.length === 0 ? (
        <p>No todos yet. Add one to get started!</p>
      ) : (
        incompleteNotes.map((note) => (
          <div key={note.todo_id}>
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <p>Priority: {note.priority}</p>
            <label>
              <input
                type="checkbox"
                checked={note.is_completed || false}
                onChange={() =>
                  handleToggleCompletion(note.todo_id, note.is_completed)
                }
              />
              Completed?
            </label>
          </div>
        ))
      )}
    </>
  );
}

function CompleteNotes() {
  const [completeNotes, setCompleteNotes] = useState([]);

  const navigate = useNavigate();
  const fetchComplete = useCallback(async () => {
    const response = await fetch(
      "http://localhost:8080/notes/dashboard-complete",
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      navigate("/login");
      return;
    }

    const data = await response.json();
    setCompleteNotes(data.todos || []);
  }, [navigate]);

  useEffect(() => {
    fetchComplete();
  }, [fetchComplete]);

  const handleToggleCompletion = async (todo_id, currentStatus) => {
    const response = await fetch(
      "http://localhost:8080/notes/update-completion",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          todo_id,
          is_completed: !currentStatus,
        }),
      }
    );

    if (!response.ok) {
      console.error("Failed to update todo");
      return;
    }

    await fetchComplete();
  };

  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/add">Add</Link>
      {completeNotes.length === 0 ? (
        <p>No todos yet. Add one to get started!</p>
      ) : (
        completeNotes.map((note) => (
          <div key={note.todo_id}>
            <h2>{note.title}</h2>
            <p>{note.description}</p>
            <p>Priority: {note.priority}</p>
            <label>
              <input
                type="checkbox"
                checked={note.is_completed || false}
                onChange={() =>
                  handleToggleCompletion(note.todo_id, note.is_completed)
                }
              />
              Completed?
            </label>
          </div>
        ))
      )}
    </>
  );
}
