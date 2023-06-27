import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "./Editor";

import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase.utils";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditPost() {
  // Cria um estado para o ID,  título, summary, content e files
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(files);
    // Função assíncrona que busca os dados do post pelo ID e preenche os campos do formulário com os valores encontrados
      
  }, [files]);

  useEffect(() => {
  // Função assíncrona que busca os dados do post pelo ID e preenche os campos do formulário com os valores encontrados

    (async () => {
      const docSnap = await getDoc(doc(db, "posts", id));

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content);
        setFiles(data.imageURL);
      } else {
        console.log("Não encontrado!");
      }
    })();
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const docRef = doc(collection(db, "posts"));              // Referência a uma nova coleção "posts" no banco de dados
    if (typeof files === "object") {
      const imageRef = ref(storage, `images/${docRef.id}`);  // Referência a uma nova imagem no armazenamento
      await uploadBytes(imageRef, files[0], {
        contentType: "image/jpeg",
      });
      const URL = await getDownloadURL(ref(storage, `images/${docRef.id}`));
      await updateDoc(doc(db, "posts", id), {
        // Atualiza o documento do post com os novos valores
        title,
        summary,
        content,
        imageURL: URL,
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        // Atualiza o documento do post com os novos valores

        title,
        summary,
        content,
        imageURL: files,
      });
    }
    navigate("/");        // Navega de volta para a página inicial após a atualização do post
  }

  return (
    <form onSubmit={updatePost}>
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
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Atualizar post</button>
    </form>
  );
}
