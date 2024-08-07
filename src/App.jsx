import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import { Routes, useNavigate, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredPosts = posts.filter((post) => {
      if (
        post.title.toUpperCase().includes(search.toUpperCase()) ||
        post.body.toUpperCase().includes(search.toUpperCase())
      ) {
        return true;
      } else {
        return false;
      }
    });

    setSearchResults(filteredPosts);
  }, [posts, search]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://lesson-3-react2.onrender.com/posts"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const newPosts = [...posts, newPost];
    setPosts(newPosts);
    setPostTitle("");
    setPostBody("");
    navigate("/");
  };
  console.log(postTitle);
  console.log(postBody);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://lesson-3-react2.onrender.com/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const filteredPosts = posts.filter((post) => post.id !== id);
      setPosts(filteredPosts);
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      {loading && <p>Loading...</p>}
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />
        <Route
          path="/post/:id"
          element={
            <PostPage
              posts={posts}
              handleDelete={handleDelete}
              setPosts={setPosts}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
