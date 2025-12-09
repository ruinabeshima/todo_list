import { Route, Routes } from "react-router-dom";
import Register from "./components/register";

const routes = (
  <Routes>
    <Route path="/register" element={<Register />}></Route>
  </Routes>
)

export default routes