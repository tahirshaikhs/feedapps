// DisplayPosts.jsx
import React, { useState, useEffect } from 'react';

const Display= () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from post.json when component mounts
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <p>{post.content}</p>
            <p>Date: {post.date}</p>
            <p>Username: {post.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Display;
