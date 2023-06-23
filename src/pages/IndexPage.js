import Post from "../components/Post";
import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.utils";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const appendArr = [];
        const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
          appendArr.push(doc.data());
        });
        setPosts(appendArr);
      } catch (err) {
        console.error(err);
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
