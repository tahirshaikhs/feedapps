import React, { useState, useEffect } from "react";
import './Viewotherpost.css';
import CustomNavbar from "./Navbar";

function Viewotherpost() {
    const [posts, setPosts] = useState([]);
    const [originalPosts, setOriginalPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/viewmypost")
            .then((response) => response.json())
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });

        fetch("http://localhost:3000/post")
            .then((response) => response.json())
            .then((data) => {
                setOriginalPosts(data);
            })
            .catch((error) => {
                console.error("Error fetching original posts:", error);
            });
    }, []);

    const filterPosts = () => {
        const matchedData = originalPosts.map(post => post.data);

        const filteredPosts = posts.filter(post => matchedData.includes(post.data));

        return filteredPosts;
    };

    return (
        <>
            <CustomNavbar/>
        <div className="container" id="maindiv">
            <div className="row">
                {filterPosts().map((post) => (
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
            </>
    );
}

export default Viewotherpost;
