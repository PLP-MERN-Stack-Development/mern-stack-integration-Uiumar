import { useEffect, useState } from "react";
import { postService } from "../services/api";
import { useParams } from "react-router-dom";
import CommentList from "../components/CommentList";
import { useAuth } from "../contexts/AuthContext";

export default function SinglePost() {
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    postService.getPost(id).then((res) => {
      setPost(res.post || res);
    });
  }, [id]);

  const addComment = async () => {
    if (!comment.trim()) return;
    const res = await postService.addComment(id, { content: comment });
    setPost(res.post || res);
    setComment("");
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <CommentList comments={post.comments} />

      {user && (
        <div style={{ marginTop: "20px" }}>
          <textarea
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <br />
          <button onClick={addComment}>Add Comment</button>
        </div>
      )}
    </div>
  );
}
