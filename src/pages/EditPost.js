import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "./Editor";

import { collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase.utils";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(files);
  }, [files]);

  useEffect(() => {
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
    const docRef = doc(collection(db, "posts"));
    if (typeof files === "object") {
      const imageRef = ref(storage, `images/${docRef.id}`);
      await uploadBytes(imageRef, files[0], {
        contentType: "image/jpeg",
      });
      const URL = await getDownloadURL(ref(storage, `images/${docRef.id}`));
      await updateDoc(doc(db, "posts", id), {
        title,
        summary,
        content,
        imageURL: URL,
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        title,
        summary,
        content,
        imageURL: files,
      });
    }
    navigate("/");
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
}
