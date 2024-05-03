import React, { useState, useEffect } from "react";
import './Adminuser.css'

function Adminuser({ updatePosts }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/post")
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/post/${id}`, {
            method: "DELETE"
        })
        .then((response) => {
            if (response.ok) {
                setPosts(posts.filter(post => post.id !== id));
                console.log("Post deleted successfully");
            } else {
               
                throw new Error("Failed to delete post");
            }
        })
        .catch((error) => {
            console.error("Error deleting post:", error);
        });
    };

    const handleApprove = (post) => {
        fetch("http://localhost:3000/viewmypost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then((response) => {
            if (response.ok) {
                console.log("Post approved and moved to viewmypost");
                return response.json();
            } else {
                throw new Error("Failed to approve post");
            }
        })
        .then((data) => {
            
            updatePosts(data);
        })
        .catch((error) => {
            console.error("Error approving post:", error);
        });
    };

    return (
        <div className="first">
          
            <div > 
                {posts.map((post) => (
                    <div key={post.id} className="second">
                        <p>{post.data}</p>
                        <p>Date: {post.date}</p>
                        <p>Created: {post.username}</p>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                        <button onClick={() => handleApprove(post)}>Approve</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Adminuser;
