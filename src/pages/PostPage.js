import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "./Editor";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.utils";

export default function EditPost() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    (async () => {
      const docSnap = await getDoc(doc(db, "posts", id));
      if (docSnap.exists()) {
        setPostData(docSnap.data());
      } else {
        console.log("Não encontrado!");
      }
    })();
  }, []);

  return (
    <>
      {postData ? (
        <>
          <div>Título: {postData.title}</div>
          <div>Summary: {postData.summary}</div>
          <div>Data: {Date(postData.createdAt.seconds)}</div>
          <div dangerouslySetInnerHTML={{ __html: postData.content }}></div>
          <img src={postData.imageURL} />

          <a href={`/edit/${id}`} style={{ marginTop: "5px" }}>
            Update post
          </a>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
