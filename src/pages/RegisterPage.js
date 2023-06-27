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
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (e) => {                                   // Função de callback para o envio do formulário
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );                                                              // Cria um novo usuário no Firebase Authentication

      await setDoc(doc(db, "users", user.uid), {
        email,
        name,
      });                                                            // Cria um novo documento de usuário no Firestore          

      setUserInfo({
        email: user.email,
        uid: user.uid,
        name,                                                       // Define as informações do usuário no estado global
      });
      localStorage.setItem("userInfo", userInfo);                   // Armazena as informações do usuário no localStorage
      navigate("/");                                                // Navega para a página inicial
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
      <div className={"card-conteudo"}>
        <h1>Registre-se</h1>
        <hr></hr>
        <br></br>
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
      </div>
    </form>
  );
}
