import { formatISO9075 } from "date-fns";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  imageURL,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={imageURL} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author"></a>
          <time>{formatISO9075(createdAt.seconds * 1000)}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
