import { useUser } from "../../context/userContext";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProviderDashboard() {
    const { user, role } = useUser();
    const [reviews, setReviews] = useState([]);
    let baseURL = "http://localhost:3000/api"

    useEffect(() => {
        if (!user?._id) return;
        async function fetchReviews() {
            try {
                const response = await axios.get(`${baseURL}/reviews/user/${user._id}`);
                setReviews(response.data)
            } catch(err){
                console.error("Error fetching reviews:", err.message);
            }
        }
        fetchReviews();
    }, [user]);


    return (
    <>
        <h1> Provider</h1>
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

                <h3>Reviews: </h3>
                {reviews.length > 0? (
                    reviews.map(review => (
                    <p key={review._id}>{review.reviewer.userName}: {review.rating}/5 - {review.comment}</p>))
                    ) : (
                        <p>No Reviews Yet.</p>
                    )}
                
                <div className="forPublicProfile">
                    <button>Contact provider</button>
                </div>
                <div className="forDashboard">
                    <button>Edit Profile</button>
                    <button>Delete Profile</button>
                </div>
            </div><br/>
            </div>
    </>
    )
}