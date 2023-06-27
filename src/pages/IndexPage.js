import Post from "../components/Post";
import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.utils";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);             // Define o estado dos posts como um array vazio

  useEffect(() => {
    // Função assíncrona que é executada após o componente ser montado

    (async () => {
      try {
        const appendArr = [];                                           // Array temporário para armazenar os dados dos posts
        const querySnapshot = await getDocs(collection(db, "posts"));  // Obtém todos os documentos da coleção "posts" no banco de dados
        querySnapshot.forEach((doc) => {
          appendArr.push(doc.data());                                 // Adiciona os dados de cada documento ao array temporário
        }); 
        setPosts(appendArr);                                         // Define o estado dos posts com o array completo
      } catch (err) {
        console.error(err);                                         // Exibe qualquer erro ocorrido durante a recuperação dos posts
      }
    })();
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <div key={post._id}>
              <Post {...post} />
            </div>
          );
        })}
    </>
  );
}
