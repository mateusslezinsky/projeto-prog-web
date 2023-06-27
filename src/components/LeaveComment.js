import { useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { UserContext } from "../UserContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase.utils";

const LeaveComment = ({ id, postData, setPostData }) => {
  const { userInfo } = useContext(UserContext);

  const leaveComment = async (e) => {
    e.preventDefault();
    const commentId = uuid();
    const commentObj = {
      author: userInfo.name,
      mainText: commentInput,
      id: commentId,
    };
    await updateDoc(doc(db, "posts", id), {
      comments: arrayUnion(commentObj),
    });
    setPostData({
      ...postData,
      comments: [...postData.comments, commentObj],
    });
    setCommentInput("");
  };
  const [commentInput, setCommentInput] = useState("");
  return (
    <form onSubmit={leaveComment}>
      <div className={"comment"}>
        <div className={"comment-input"}>
          <input
            type="text"
            placeholder="Deixe seu comentário..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            required
          />
        </div>
        <div className={"comment-button"}>
          <button>Comentar</button>
        </div>
      </div>
    </form>
  );
};

export default LeaveComment;
