import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postService } from "../services/api";
import CategorySelect from "../components/CategorySelect";

export default function Editor() {
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (isEditing) {
      postService.getPost(id).then((res) => {
        const p = res.post || res;
        setTitle(p.title);
        setContent(p.content);
        setExcerpt(p.excerpt);
        setCategory(p.category);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { title, content, excerpt, category };

    if (isEditing) {
      await postService.updatePost(id, data);
      alert("Post updated successfully!");
    } else {
      await postService.createPost(data);
      alert("Post created successfully!");
    }
  };

  return (
    <div>
      <h1>{isEditing ? "Edit Post" : "Create Post"}</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          rows="6"
          placeholder="Post content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <textarea
          rows="3"
          placeholder="Short excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <CategorySelect value={category} onChange={setCategory} />

        <button type="submit" style={{ marginTop: "10px" }}>
          Save
        </button>
      </form>
    </div>
  );
}
