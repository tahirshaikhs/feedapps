import React, { useState, useEffect } from "react";
import CustomNavbar from "../component/Navbar";

function Approve() {
    const [userPosts, setUserPosts] = useState([]);
    const [editData, setEditData] = useState(""); 
    const [editingId, setEditingId] = useState(null); 

    useEffect(() => {
        fetch(`http://localhost:3000/viewmypost?username=${localStorage.getItem("username")}`)
            .then(response => response.json())
            .then(data => setUserPosts(data))
            .catch(error => console.error("Error fetching user posts:", error));
    }, []);

    return (
        <>
            <CustomNavbar/>
            <div className="first" style={{ margin:"50px"}}>
                {userPosts.length === 0 ? (
                    <div>No posts found. Your posts will appear here once approved.</div>
                ) : (
                    userPosts.map(post => (
                        <div key={post.id} className="second">
                            <div>
                                <p>{post.data}</p>
                                <p>Created: {post.username}</p>
                                <p>Date: {post.date}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default Approve;
