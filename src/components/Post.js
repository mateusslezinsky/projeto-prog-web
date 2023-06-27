import {format, formatISO9075} from "date-fns";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {formatISO9075WithOptions} from "date-fns/fp";

export default function Post(
    {
        _id,
        title,
        summary,
        imageURL,
        content,
        createdAt,
        creator,
    }) {
    return (
        <div className="post card-principal">
            <div className="image-div">
                <Link to={`/post/${_id}`}>
                    <img className={"img-principal"} src={imageURL} alt=""/>
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <span className={"titulo"}>{title}</span>
                </Link>
                <p className="info">
                    <a className="author">
                        <b>{creator}</b>
                    </a>
                    <time>
                        em <b>{format(createdAt.seconds * 1000, "dd/MM/yyyy HH:mm")}</b>
                    </time>
                </p>
                <div className={"summary-principal"}>
                    <p className="summary">{summary}</p>
                </div>
            </div>
        </div>
    );
}
