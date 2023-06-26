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
        Auluma News
      </Link>

      {userInfo ? (
        <>
          <div>Olá, {userInfo.name}</div>
          <nav>
            <Link to="/create">Criar novo post</Link>
            <Link to="/user">Minha conta</Link>
            <button className="logout" onClick={onLogout}>
              Logout
            </button>
          </nav>
        </>
      ) : (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Registrar</Link>
        </nav>
      )}
    </header>
  );
}
