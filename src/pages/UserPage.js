import {useContext, useEffect, useState} from "react";
import {UserContext} from "../UserContext";

import {db} from "../firebase/firebase.utils";
import {getDoc, doc, updateDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

const UserPage = () => {
    const [name, setName] = useState("");
    const {userInfo, setUserInfo} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const docSnap = await getDoc(doc(db, "users", userInfo.uid));

            if (docSnap.exists()) {
                setName(userInfo.name);
            } else {
                console.log("Não encontrado!");
            }
        })();
    }, []);

    const changeName = async (e) => {
        e.preventDefault();
        const document = await updateDoc(doc(db, "users", userInfo.uid), {
            name,
        });
        console.log(document);
        setUserInfo({...userInfo, name});
        navigate("/");
    };
    return (
        <>
            <h1>Alterar nome de usuário</h1>

            <form onSubmit={changeName}>
                <div className={"comment"}>
                    <div className={"comment-input"}>
                        <input
                            type="text"
                            placeholder="Digite seu novo nome..."
                            value={name}
                            onChange={(ev) => setName(ev.target.value)}
                        />
                    </div>
                    <div className={"comment-button"}>
                        <button style={{marginTop: "5px"}}>Atualizar nome</button>
                    </div>
                </div>

            </form>
        </>
    );
};

export default UserPage;
