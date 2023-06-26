import {useContext, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import {doc, getDoc, deleteDoc} from "firebase/firestore";
import {db, storage} from "../firebase/firebase.utils";
import {format} from "date-fns";
import {UserContext} from "../UserContext";
import {ref, deleteObject} from "firebase/storage";

import Comment from "../components/Comment";

export default function EditPost() {
    const {id} = useParams();
    const [postData, setPostData] = useState(null);

    const {userInfo} = useContext(UserContext);
    const navigate = useNavigate();

    const [comments, setComments] = useState([]);

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
                        <div dangerouslySetInnerHTML={{__html: postData.content}}></div>
                        <div className={"image-div"}>
                            <img className={"img-conteudo"} src={postData.imageURL}/>
                        </div>
                    </div>
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
                    <div className={"card-conteudo"}>
                        <h3>Comentários</h3>
                        <hr></hr>
                        <form>
                            <div className={"comment"}>
                                <div className={"comment-input"}>
                                    <input
                                        type="text"
                                        placeholder="Deixe seu comentário..."
                                        required
                                    />
                                </div>
                                <div className={"comment-button"}>
                                    <button>Comentar</button>
                                </div>
                            </div>
                        </form>
                        <hr></hr>
                        <br></br>
                        {comments.length === 0 ? (
                            <p>Não há comentários!</p>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id}>
                                    <Comment {...comment} />
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </>
    );
}
