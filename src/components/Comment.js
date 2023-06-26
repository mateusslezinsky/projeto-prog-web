const Comment = ({ mainText, author }) => {
  return (
    <div className="comment">
      <h4>{author}</h4>
      <p>{mainText}</p>
    </div>
  );
};

export default Comment;
