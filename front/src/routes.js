import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/post/edit/:id" element={<EditPost />} />
    </Routes>
  );
};
export default AppRoutes;
