import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import { auth, db } from "../firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const docSnapshot = await getDoc(doc(db, "users", user.uid));
      if (docSnapshot.exists()) {
        const { name } = docSnapshot.data();
        const userObj = {
          email: user.email,
          uid: user.uid,
          name,
        };
        setUserInfo(userObj);
        localStorage.setItem("userInfo", JSON.stringify(userObj));
        navigate("/");
      } else {
        setError("Usuário não encontrado!");
      }
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Usuário não encontrado!");
      } else if (err.code === "auth/wrong-password") {
        setError("E-mail ou senha incorretos!");
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="login">
      <div className={"card-conteudo"}>
        <h1>Login</h1>
        <hr></hr>
        <br></br>
        <input
          type="email"
          placeholder="Digite seu e-mail..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Digite sua senha..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Login</button>
        {error ? <div className="error">{error}</div> : <></>}
      </div>
    </form>
  );
}
