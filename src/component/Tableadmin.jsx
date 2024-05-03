import React, { useState, useEffect } from "react";
import './TableAdmin.css'


function TableAdmin({ updatePosts }) {
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
                    alert("Post deleted successfully")
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
                    alert("Post approved and moved to viewmypost")
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

    return <>
           <div className="container">
            <div className="card-title">
                <h2>Admin Panel</h2>
            </div>
            <div className="card-body">
               
                <table className='table table-bordered'>
                    <thead className="tthead">
                        <tr>
                            <td className="tthead">ID</td>
                            <td>Created</td>
                            <td>Date</td>
                            <td>Post</td>
                           
                            <td>Action</td>
                        </tr>

                    </thead>
                    <tbody>
                        {posts && posts.map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.username}</td>
                                <td>{post.date}</td>
                                <td>{post.data}</td>
                               
                                <td>  <div className="tabled">
                                    <button onClick={() => handleApprove(post)} class="btn btn-success">Approved</button>
                                    <button onClick={() => handleDelete(post.id)}  class="btn btn-danger">Delete</button>
                                </div>  </td>
                               
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    </>
}
export default TableAdmin;
