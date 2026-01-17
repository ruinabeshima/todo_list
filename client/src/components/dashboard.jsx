import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-base-100">
      <nav className="navbar bg-base-100 shadow-sm sticky top-0 z-2">
        <section className="flex-1">
          <a className="btn btn-ghost text-xl">ToDoInc</a>
        </section>
        <section className="flex gap-5">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />
            {/* sun icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          <button className="btn btn-primary w-22">Logout</button>
        </section>
      </nav>

      <div role="tablist" className="tabs tabs-border mt-10">
        <a
          onClick={() => setPage(1)}
          role="tab"
          className={`tab ${page === 1 ? "tab-active" : ""}`}
        >
          Incomplete
        </a>
        <a
          onClick={() => setPage(2)}
          role="tab"
          className={`tab ${page === 2 ? "tab-active" : ""}`}
        >
          Complete
        </a>
      </div>

      {page === 1 && <IncompleteNotes />}
      {page === 2 && <CompleteNotes />}
    </div>
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
      },
    );

    if (!response.ok) {
      navigate("/login");
      return;
    }

    const data = await response.json();
    setIncompleteNotes(data.todos || []);
  }, [navigate]);

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
      },
    );

    if (!response.ok) {
      console.error("Failed to update todo");
      return;
    }

    await fetchIncomplete();
  };

  useEffect(() => {
    const run = async () => {
      await fetchIncomplete();
    };
    run();
  }, [fetchIncomplete, navigate]);

  const listNotes = incompleteNotes.map((note) => {
    return (
      <div
        key={note.todo_id}
        className={`h-50 p-10 rounded-sm ${
          note.priority === 3
            ? "bg-red-100 text-red-900"
            : note.priority === 2
              ? "bg-yellow-100 text-yellow-900"
              : note.priority === 1
                ? "bg-green-100 text-green-900"
                : ""
        }`}
      >
        <p className="text-2xl">{note.title}</p>
        <p>{note.description}</p>
      </div>
    );
  });

  return (
    <>
      <div className="w-4/5 mb-10">
        {incompleteNotes.length === 0 ? (
          <p>Create a todo!</p>
        ) : (
          <div className="grid grid-cols-3 gap-7 mt-10">{listNotes}</div>
        )}
      </div>
      <div className="w-4/5 mb-10">
        <Link to="/add">
          <button className="btn btn-secondary">Add a Task</button>
        </Link>
      </div>
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
      },
    );

    if (!response.ok) {
      navigate("/login");
      return;
    }

    const data = await response.json();
    setCompleteNotes(data.todos || []);
  }, [navigate]);

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
      },
    );

    if (!response.ok) {
      console.error("Failed to update todo");
      return;
    }

    await fetchComplete();
  };

  useEffect(() => {
    const run = async () => {
      await fetchComplete();
    };
    run();
  }, [fetchComplete, navigate]);

  return (
    <section className="mt-10">
      {completeNotes.length === 0 ? (
        <p>Completed tasks will appear here.</p>
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
    </section>
  );
}
