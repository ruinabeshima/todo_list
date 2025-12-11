import { Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Add from "./components/add";

const routes = (
  <Routes>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/dashboard" element={<Dashboard />}></Route>
    <Route path="/add" element={<Add />}></Route>
  </Routes>
);

export default routes;
