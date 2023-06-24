import {format, formatISO9075} from "date-fns";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {formatISO9075WithOptions} from "date-fns/fp";

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
    <div className="post card-principal">
      <div className="image-div">
        <Link to={`/post/${_id}`}>
          <img className={"img-principal"} src={imageURL} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author"><b>criador</b></a>
          <time>em <b>{format(createdAt.seconds * 1000, "dd/MM/yyyy HH:mm")}</b></time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
