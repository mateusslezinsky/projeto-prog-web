import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.utils";
import { format } from "date-fns";
import { UserContext } from "../UserContext";

import Comment from "../components/Comment";
import LeaveComment from "../components/LeaveComment";

import PostManagement from "../components/PostManagement";

export default function EditPost() {
  const { id } = useParams();                                  // Obtém o ID do post dos parâmetros da URL
  const [postData, setPostData] = useState(null);             // Define o estado para os dados do post

  const { userInfo } = useContext(UserContext);             // Obtém as informações do usuário do contexto

  useEffect(() => {
    (async () => {
      const docSnap = await getDoc(doc(db, "posts", id));   // Obtém o documento do post no banco de dados
      if (docSnap.exists()) {
        setPostData(docSnap.data());                       // Define os dados do post no estado
      } else {
        console.log("Não encontrado!");
      }
    })();
  }, []);

  return (
    <>
      {postData && (
        <>
          <div className={"card-conteudo"}>
            <div>
              <h1>{postData.title}</h1>
            </div>
            <div>
              <h4>{postData.summary}</h4>
            </div>
            <div>
              <p>
                Publicado em&nbsp;
                <b>
                  {format(
                    postData.createdAt.seconds * 1000,
                    "dd/MM/yyyy HH:mm"
                  )}
                </b>
                &nbsp;por <b>{postData.creator}</b>
              </p>
            </div>
            <hr></hr>
            <div dangerouslySetInnerHTML={{ __html: postData.content }}></div>
            <div className={"image-div"}>
              <img className={"img-conteudo"} src={postData.imageURL} />
            </div>
          </div>
          <PostManagement postData={postData} id={id} />
          <div className={"card-conteudo"}>
            <h3>Comentários</h3>
            {userInfo ? (
              <>
                <hr></hr>
                <LeaveComment
                  setPostData={setPostData}
                  postData={postData}
                  id={id}
                />
                <hr></hr>
                <br></br>
              </>
            ) : (
              <></>
            )}        
            <Comment postData={postData} />          
          </div>
        </>
      )}
    </>
  );
}
