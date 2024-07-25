import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete, setPosts }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  function handleEdit(id) {
    const editedPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          title,
          body,
        };
      } else {
        return post;
      }
    });
    setPosts(editedPosts);
    setEdit(false);
  }

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            {edit ? (
              <input
                className="title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h2>{post.title}</h2>
            )}
            <p className="postDate">{post.datetime}</p>
            {edit ? (
              <textarea
                className="title-input"
                rows="5"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            ) : (
              <p className="postBody">{post.body}</p>
            )}
            <button onClick={() => handleDelete(post.id)}>Delete Post</button>
            <button
              style={{
                marginLeft: "1rem",
                backgroundColor: edit ? "cornflowerblue" : "#a9a9a9",
              }}
              onClick={() => {
                setEdit(!edit);
                if (edit) {
                  handleEdit(post.id);
                }
              }}
            >
              {edit ? "Save" : "Edit Post"}
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
