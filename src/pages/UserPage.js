import {useContext, useEffect, useState} from "react";
import {UserContext} from "../UserContext";

import {db} from "../firebase/firebase.utils";
import {getDoc, doc, updateDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

const UserPage = () => {
    const [name, setName] = useState("");                       // Define o estado para o nome do usuário
    const {userInfo, setUserInfo} = useContext(UserContext);   // Obtém as informações do usuário do contexto

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const docSnap = await getDoc(doc(db, "users", userInfo.uid));       // Obtém o documento do usuário do Firestore

            if (docSnap.exists()) {
                setName(userInfo.name);                                      // Define o nome do usuário no estado
            } else {
                console.log("Não encontrado!");                             // Exibe uma mensagem de "Não encontrado" no console
            }
        })();
    }, []);

    const changeName = async (e) => {                                       // Função de callback para alterar o nome do usuário
        e.preventDefault();
        const document = await updateDoc(doc(db, "users", userInfo.uid), {  // Impede o comportamento padrão de envio do formulário
            name,
        });                                                                 // Atualiza o documento do usuário no Firestore com o novo nome
        console.log(document);
        setUserInfo({...userInfo, name});
        navigate("/");
    };
    return (
        <>
            <h1>Alterar nome de usuário</h1>

            <form onSubmit={changeName}>
                <div className={"comment-section"}>
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
