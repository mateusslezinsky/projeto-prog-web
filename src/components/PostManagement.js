import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { ref, deleteObject } from "firebase/storage";

import { doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../firebase/firebase.utils";

const PostManagement = ({ postData, id }) => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const removePost = async () => {
    const imageRef = ref(storage, `images/${id}`);
    try {
      deleteObject(imageRef);
      await deleteDoc(doc(db, "posts", id));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {userInfo && userInfo.email === postData.owner && (
        <div className={"actions"}>
          <Link className={"action update"} to={`/edit/${id}`}>
            Atualizar notícia
          </Link>
          <Link className={"action delete"} onClick={removePost}>
            Excluir notícia
          </Link>
        </div>
      )}
    </>
  );
};

export default PostManagement;
