import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Dashboard() {
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
      console.log(data);
    };

    handleData();
  }, [navigate]);

  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/add">Add</Link>
    </>
  );
}
