import { useState } from "react";
import './Createpost.css'
import { Link } from "react-router-dom";
import CustomNavbar from "./Navbar";
import Footer from "./Footer";

function Createpost() {
    const [inputData, setInputData] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [postsubmit, setPostsubmit] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputData.trim()) {
            setRegistrationSuccess(true); // Update state on successful registration
            setTimeout(() => {
                setRegistrationSuccess(false);
              
            }, 5000);
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
                setPostsubmit(true); // Update state on successful registration
                setTimeout(() => {
                    setPostsubmit(false);
                  
                }, 5000);
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
            <CustomNavbar />
            {registrationSuccess&&(<div className="alert alert-success alert-dismissible fade show d-flex justify-content-between align-items-center" role="alert">
                Please enter something to create a post!!
                <img src="close.png" alt="Close" className="close" onClick={() => setRegistrationSuccess(false)}/>
                    
              
            </div>)}
            {postsubmit&&(<div className="alert alert-success alert-dismissible fade show d-flex justify-content-between align-items-center" role="alert">
                Post Created!!
                <img src="close.png" alt="Close" className="close" onClick={() => setPostsubmit(false)}/>
                    
              
            </div>)}
        <div>
            <div className=" createpost">
                    <form className="container" onSubmit={handleSubmit}>
                    <div className="row d-flex justify-content-center">
            <div className="col-md-10">
                <input className="postuser"
                    type="text"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder="ENTER YOUR POST"
                    />
                    <div className="allbtn">
                    <div >
                        <button className="btns btn btn-success" type="submit">Create Post</button>
                    </div>
                    <div className="linkdivtwo">
                       <Link to="/viewmypost" className="linktwo"><button className="btn btn-danger btn-width">View My Post</button></Link>
                    </div>
                    <div className="linkdivtwo">
                            <Link to="/Viewotherpost" className="linktwo "><button className="btn btn-primary btn-width">View other User Post</button></Link>
                        
                        </div>
                                </div>
                            </div>
                            </div>
                </form>
                </div>
            </div>
            <Footer/>
            </>
    );
}

export default Createpost;
