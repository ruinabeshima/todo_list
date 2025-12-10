import { Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Dashboard from "./components/dashboard";

const routes = (
  <Routes>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/dashboard" element={<Dashboard />}></Route>
  </Routes>
)

export default routes