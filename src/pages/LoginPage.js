import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import { auth, db } from "../firebase/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function LoginPage() {

  // Cria um estado para o email  senha e user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);                                  // Obtém a função de atualização das informações do usuário do contexto

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);   // Autentica o usuário com o email e senha fornecidos

      const docSnapshot = await getDoc(doc(db, "users", user.uid));             // Obtém o documento do usuário no banco de dados
      if (docSnapshot.exists()) {
        const { name } = docSnapshot.data();                                  // Obtém o nome do usuário do documento
        const userObj = {
          email: user.email,
          uid: user.uid,
          name,
        };
        setUserInfo(userObj);                                             // Atualiza as informações do usuário no contexto
        localStorage.setItem("userInfo", JSON.stringify(userObj));       // Armazena as informações do usuário no armazenamento local
        navigate("/");                                                  // Redireciona para a página inicial
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
          onChange={(e) => setEmail(e.target.value)}      // Atualiza o valor do email conforme o usuário digita
          required
        />
        <input
          type="password"
          placeholder="Digite sua senha..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}   // Atualiza o valor da senha conforme o usuário digita
          required
        />
        <button>Login</button>
        {error ? <div className="error">{error}</div> : <></>}
      </div>
    </form>
  );
}
