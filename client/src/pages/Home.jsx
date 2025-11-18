import { useEffect, useState } from "react";
import { postService } from "../services/api";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    postService.getAllPosts(page).then((res) => {
      setPosts(res.data || res.posts || []);
      setMeta(res.meta || {});
    });
  }, [page]);

  return (
    <div>
      <h1>Latest Posts</h1>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {meta.totalPages && (
        <Pagination
          page={page}
          totalPages={meta.totalPages}
          onChange={(p) => setPage(p)}
        />
      )}
    </div>
  );
}
