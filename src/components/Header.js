import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

import { auth } from "../firebase/firebase.utils";
import { signOut } from "firebase/auth";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      await signOut(auth);
      setUserInfo(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {userInfo ? (
          <>
            <Link to="/create">Create new post</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}