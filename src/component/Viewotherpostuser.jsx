import React, { useState, useEffect } from "react";
// import './Adminuser.css'
import './Viewotherpost.css'

function Viewotherpost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/viewmypost")
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []);

    return (
        <div className="container">
            <div className="row">
                {posts.map((post) => (
                    <div key={post.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <p className="text-black">{post.data}</p>
                                <p className="text-black">Date: {post.date}</p>
                                <p className="text-black">Created: {post.username}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Viewotherpost;
