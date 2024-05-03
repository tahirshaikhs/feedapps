import React from 'react';
import postData from './post.json';
import './viewpost.css'; // Import CSS file

const ViewMyPost = () => {
  const handleDelete = (index) => {
    // Delete post at the specified index from the postData array
    const updatedPosts = [...postData];
    updatedPosts.splice(index, 1);
    // Update the post.json file with the updated array
    const json = JSON.stringify(updatedPosts);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'post.json';
    link.click();
  };

  const handleUpdate = (index) => {
    // Implement update functionality as per your requirements
    console.log('Update post at index:', index);
  };

  return (
    <div>
      <h2>My Posts</h2>
      <ul>
        {postData.map((post, index) => (
          <li key={index} className="post-container">
            <div className="post-content">{post.usercontent}</div>
            <div className="post-info">Date: {post.currentDate}</div>
            <div className="post-info">Created by: {post.username}</div>
            <div className="post-buttons">
              <button onClick={() => handleDelete(index)}>Delete</button>
              <button onClick={() => handleUpdate(index)}>Update</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMyPost;
