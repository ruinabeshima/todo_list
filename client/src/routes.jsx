import { Route, Routes } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";

const routes = (
  <Routes>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/login" element={<Login />}></Route>
  </Routes>
)

export default routes