import Post from "../components/Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
}
