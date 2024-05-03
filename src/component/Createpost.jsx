import { useState } from "react";
import './Createpost.css'
import { Link } from "react-router-dom";
import CustomNavbar from "./Navbar";

function Createpost() {
    const [inputData, setInputData] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputData.trim()) {
            alert("Please enter your post before submitting.");
            return;
        }
        
        const postData = {
            data: inputData,
            username: localStorage.getItem("username"),
            date: new Date().toLocaleDateString()
        };

        fetch("http://localhost:3000/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
        .then((response) => {
            if (response.ok) {
                // Handle successful post
                alert("Post successful");
                console.log("Post successful");
            } else {
                throw new Error("Failed to post data");
            }
        })
        .catch((error) => {
            console.error("Error posting data:", error);
        });
    };

    return (
        <>
            <CustomNavbar/>
        <div>
            <div className="createpost">
            <form onSubmit={handleSubmit}>
                <input className="postuser"
                    type="text"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder="ENTER YOUR POST"
                    />
                    <div className="allbtn">
                    <div>
                        <button className="btns btn btn-success" type="submit">Create Post</button>
                    </div>
                    <div className="linkdivtwo">
                       <Link to="/viewmypost" className="linktwo"><button className="btn btn-danger btn-width">View My Post</button></Link>
                    </div>
                    <div className="linkdivtwo">
                            <Link to="/Viewotherpost" className="linktwo "><button className="btn btn-primary btn-width">View other User Post</button></Link>
                        
                        </div>
                        </div>
                </form>
                </div>
            </div>
            </>
    );
}

export default Createpost;
