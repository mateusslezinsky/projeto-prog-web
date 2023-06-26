import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import UserPage from "./pages/UserPage";

import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route element={<PrivateRoute isPrivate={false} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<PrivateRoute isPrivate={true} />}>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/user" element={<UserPage />} />
          </Route>

          <Route path="/post/:id" element={<PostPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
