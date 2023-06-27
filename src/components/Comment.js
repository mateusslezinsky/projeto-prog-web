const Comment = ({ postData }) => {
  return (
    <>
      {postData.comments.length === 0 ? (
        <p>Não há comentários!</p>
      ) : (
        postData.comments.map(({ author, id, mainText }) => (
          <div key={id}>
            <div className="comment">
              <h4>{author}</h4>
              <p>{mainText}</p>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Comment;
