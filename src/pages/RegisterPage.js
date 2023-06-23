import { useState, useContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase.utils";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", user.uid), {
        email,
        name,
      });

      setUserInfo({
        email: user.email,
        uid: user.uid,
        name,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/weak-password") {
        setError("Digite uma senha que possua pelo menos 6 caracteres");
      } else if (err.code === "auth/email-already-in-use") {
        setError("Esse e-mail já está em uso! Escolha outro...");
      }
    }
  };

  return (
    <form className="register" onSubmit={onSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Digite seu nome..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
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
      <button>Register</button>
      {error ? <div className="error">{error}</div> : <></>}
    </form>
  );
}
