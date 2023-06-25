import {useEffect, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import Editor from "./Editor";

import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase/firebase.utils";
import {format} from "date-fns";

export default function EditPost() {
    const {id} = useParams();
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
                    <div className={"card-conteudo"}>
                        <div><h1>{postData.title}</h1></div>
                        <div><h4>{postData.summary}</h4></div>
                        <div>
                            <p>
                                Publicado em&nbsp;
                                <b>{format(postData.createdAt.seconds * 1000, "dd/MM/yyyy HH:mm")}</b>
                                &nbsp;por <b>criador{postData.creator}</b>
                            </p>
                        </div>
                        <hr></hr>
                        <div dangerouslySetInnerHTML={{__html: postData.content}}></div>
                        <div className={"image-div"}>
                            <img className={"img-conteudo"} src={postData.imageURL}/>
                        </div>
                    </div>
                    <div className={"actions"}>
                        <Link className={"action update"} to={`/edit/${id}`}>
                            Atualizar notícia
                        </Link>
                        <Link className={"action delete"} to={`/edit/${id}`}>
                            Excluir notícia
                        </Link>
                    </div>
                </>
            ) : (
                <></>
            )}
        </>
    );
}
