export default function CommentList({ comments }) {
  if (!comments || comments.length === 0)
    return <p>No comments yet. Be the first!</p>;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Comments</h3>
      {comments.map((c, index) => (
        <div key={index} className="card">
          <p>{c.content}</p>
          <small>{new Date(c.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
