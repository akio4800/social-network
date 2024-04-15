// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  content: string;
}

export function App() {
  const [posts, setPosts] = useState([]);
  // get the posts from the `feed` nx app and display them

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3000');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <h1>Welcome to ui!</h1>
      <h2>Posts</h2>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.id}>{post.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
