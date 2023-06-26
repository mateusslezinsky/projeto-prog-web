import "react-quill/dist/quill.snow.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "./Editor";

import { collection, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase.utils";
import { UserContext } from "../UserContext";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const { userInfo } = useContext(UserContext);

  const navigate = useNavigate();

  const createNewPost = async (ev) => {
    ev.preventDefault();
    const docRef = doc(collection(db, "posts"));
    const imageRef = ref(storage, `images/${docRef.id}`);
    await uploadBytes(imageRef, files[0], {
      contentType: "image/jpeg",
    });
    const URL = await getDownloadURL(ref(storage, `images/${docRef.id}`));

    await setDoc(docRef, {
      title,
      summary,
      content,
      imageURL: URL,
      createdAt: new Date(),
      _id: docRef.id,
      creator: userInfo.name,
      owner: userInfo.email,
    });

    navigate("/");
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
