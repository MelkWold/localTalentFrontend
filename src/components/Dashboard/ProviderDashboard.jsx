import { useUser } from "../../context/userContext";
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Dashboard.css";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function ProviderDashboard() {
    const {user, role, setUser} = useUser();
    const [reviews, setReviews] = useState([]);
    const navigate= useNavigate();
    const [cookies] = useCookies(["token"]);
    let baseURL = "http://localhost:3000/api";

    // Define fetchReviews to fetch the reviews associated with the authenticated current user and run it everytime the user or the token changes.
    useEffect(() => {
        if (!user?._id) return;

        async function fetchReviews() {
            try {
                const response = await axios.get(`${baseURL}/reviews/user/${user._id}`, {
                    headers: {
                        "x-auth-token": cookies.token,
                    },
                });
                setReviews(response.data)
            } catch(err){
                console.error("Error fetching reviews:", err.message);
            }
        }
        fetchReviews();
    }, [user, cookies.token]);
    
    // Define a function to handle Editing profile (redirect this to the edit page)
    async function handleEdit(){
        navigate(`/edit-profile/${user._id}`);
    };

    // Define the handleDelete function to allow authenticated users to delete their profile
    async function handleDelete(){
        const confirmDelete = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${baseURL}/users/${user._id}`, {
                headers: {
                    'x-auth-token': cookies.token,
                },
            });
            
            alert("Your profile has been deleted.");
            setUser(null);
            navigate("/signin");
        } catch(err) {
            console.error("Error deleting profile: ", err.message);
            alert("Failed to delete profile. Please try again later.")
        }
    };



    return (
    <>

        <div className = "profileCard">
            <div >
                <h2>Personal Information</h2>
                <p>
                    <span style={{fontWeight: "bold"}}>Full Name: </span> 
                        {user.userName} 
                </p>
                <p>
                    <span style={{fontWeight: "bold"}}>Role: </span> 
                        {user.role} 
                </p>
                <p><span style={{fontWeight: "bold"}}>Address: </span>
                    {user.userAddress?.city}, {user.userAddress?.state}, {user.userAddress?.country} 
                </p>
                <p><span style={{fontWeight: "bold"}}>Phone: </span>
                    {user.phone}
                    </p>
                
                <p><span style={{fontWeight: "bold"}}>Services: </span>{user.services?.length > 0 ? user.services.join(", ") : "No services listed" } </p>

                <h3>Reviews </h3>
                {reviews.length > 0? (
                    reviews.map(review => (
                    <p className="reviewParagraph" key={review._id}>{review.reviewer?.userName || "Unknown Reviewer"}: {review.rating}/5 - {review.comment}</p>))
                    ) : (
                        <p>No Reviews Yet.</p>
                    )}
                
                <div className="forDashboard">
                    <button onClick={handleEdit}>Edit Profile</button>
                    <button onClick={handleDelete}>Delete Profile</button>
                </div>
            </div><br/>
            </div>
    </>
    )
}