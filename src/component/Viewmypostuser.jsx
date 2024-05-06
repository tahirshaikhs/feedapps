import React, { useState, useEffect } from "react";
import CustomNavbar from "./Navbar";

function Viewmypostuser() {
    const [userPosts, setUserPosts] = useState([]);
    const [editData, setEditData] = useState(""); 
    const [editingId, setEditingId] = useState(null); 

    useEffect(() => {
        
        fetch(`http://localhost:3000/post?username=${localStorage.getItem("username")}`)
            .then(response => response.json())
            .then(data => setUserPosts(data))
            .catch(error => console.error("Error fetching user posts:", error));
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/post/${id}`, {
            method: "DELETE"
        })
        .then((response) => {
            if (response.ok) {
                setUserPosts(userPosts.filter(post => post.id !== id));
                console.log("Post deleted successfully");
            } else {
                throw new Error("Failed to delete post");
            }
        })
        .catch((error) => {
            console.error("Error deleting post:", error);
        });
    };

    const handleUpdate = (id) => {
        const currentDate = new Date().toLocaleDateString('en-GB'); 
        fetch(`http://localhost:3000/post/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: editData,
                date: currentDate,
                username: localStorage.getItem("username") 
            })
        })
        .then((response) => {
            if (response.ok) {
                console.log("Post updated successfully");
                
                setEditingId(null); 
            } else {
                throw new Error("Failed to update post");
            }
        })
        .catch((error) => {
            console.error("Error updating post:", error);
        });
    };

    return (
        <>
            <CustomNavbar />
            <h2 className="mt-5 ">Pending Post</h2>
        <div className="container bg-primary mt-4">
            {userPosts.length === 0 ? (
                <div>Create your post first.</div>
                ) : (
                        
                userPosts.map(post => (
                    <div key={post.id} className="card">
                        {editingId === post.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editData}
                                    onChange={(e) => setEditData(e.target.value)}
                                />
                                <button onClick={() => handleUpdate(post.id)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <p  className="text-black">{post.data}</p>
                                <p className="text-black">Created: {post.username}</p>
                                <p className="text-black">Date: {post.date}</p>
                                
                                <button onClick={() => handleDelete(post.id)} className="btn btn-danger">Delete</button>
                                <button onClick={() => {
                                    setEditData(post.data);
                                    setEditingId(post.id);
                                }} className="btn btn-success mt-3">Update</button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    </>
    
    );
}

export default Viewmypostuser;
