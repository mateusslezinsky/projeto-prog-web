import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import { auth } from "../firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUserInfo({
        email: user.email,
        uid: user.uid,
      });
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Usuário não encontrado!");
      } else if (err.code === "auth/wrong-password") {
        setError("E-mail ou senha incorretos!");
      }
    }
  };

  const { setUserInfo } = useContext(UserContext);

  return (
    <form onSubmit={onSubmit} className="login">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Digite seu e-mail..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Digite sua senha..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
      {error ? <div className="error">{error}</div> : <></>}
    </form>
  );
}
