import React, { useState, useEffect } from "react";
import CustomNavbar from "../component/Navbar";

function ApproveAdmin() {
    const [userPosts, setUserPosts] = useState([]);
    const [editData, setEditData] = useState(""); 
    const [editingId, setEditingId] = useState(null); 

    useEffect(() => {
        fetch(`http://localhost:3000/viewmypost`)
            .then(response => response.json())
            .then(data => setUserPosts(data))
            .catch(error => console.error("Error fetching user posts:", error));
    }, []);

    return (
        <>
            <CustomNavbar/>
            <div  style={{ margin:"50px"}}>
                {userPosts.length === 0 ? (
                    <div>No posts found.</div>
                ) : (
                    <div className="container bg-primary">
                    <div className="row  ">
                        {userPosts.map((post) => (
                            <div key={post.id} className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="text-black">{post.data}</p>
                                        <p className="text-black">Date : {post.date}</p>
                                        <p className="text-black">Name : {post.username}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </div>
        </>
    );
}

export default ApproveAdmin;
