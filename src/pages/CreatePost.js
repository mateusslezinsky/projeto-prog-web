import "react-quill/dist/quill.snow.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";
import { collection, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase.utils";
import { UserContext } from "../UserContext";

export default function CreatePost() {
  // Cria um estado para o título, summary, content e files
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  
  const { userInfo } = useContext(UserContext);  // Obtém as informações do usuário do contexto UserContext
  const navigate = useNavigate();               // Obtém a função navigate do React Router

  const createNewPost = async (ev) => {
    ev.preventDefault();                                     // Previne o comportamento padrão de envio do formulário
    const docRef = doc(collection(db, "posts"));            // Cria uma referência para um novo documento na coleção "posts"
    const imageRef = ref(storage, `images/${docRef.id}`);  // Cria uma referência para o arquivo de imagem usando o ID do documento
    await uploadBytes(imageRef, files[0], {               // Faz o upload do arquivo de imagem para o Storage
      contentType: "image/jpeg",
    });
    const URL = await getDownloadURL(ref(storage, `images/${docRef.id}`));   // Obtém a URL de download da imagem recém-carregada

    await setDoc(docRef, {                  // Cria um novo documento no Firestore com as informações do post
      title,
      summary,
      content,
      imageURL: URL,
      createdAt: new Date(),
      _id: docRef.id,
      creator: userInfo.name,
      owner: userInfo.email,
      comments: [],
    });

    navigate("/");                      // Redireciona para a página inicial após criar o post
  };

  return (
    <form onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Digite um título..."
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Digite um lide..."
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
        required
      />
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={(ev) => setFiles(ev.target.files)}
        required
      />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Criar post</button>
    </form>
  );
}
