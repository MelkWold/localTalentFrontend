import { useState, useEffect } from 'react';
import { useUser } from "../../context/userContext";
import axios from 'axios';
import { useAuth } from '../../context/regLoginContext';
import './Profile.css';

export default function Profile(){
    // To be redered conditionally based on type of user


    // define the states and user
    const [reviews, setReviews] = useState([]);
    const { user } = useUser();
    const { cookies } = useAuth();
    const token = cookies.token;
    let baseURL = "http://localhost:3000/api/reviews";
    
    // Debugging step
    // console.log(user);

    useEffect(() => {
        // Debugging step
            console.log("Token in useEffect:", token);
            console.log("User in useEffect", user);
        if(!user?._id) {
           
            // Debugging step
            console.warn("No user logged in yet");
            return;
        }

        // Fetch tasks
        async function getReviews() {
            try {

                // Debugging step
                console.log("Fetching reviews for user", user._id);
                console.log("Token:", token);

                const response = await axios.get(`${baseURL}/myreviews`, { 
                    headers: { "x-auth-token": token }, 
            });

                setReviews(response.data);
            } catch(err) {
                if(err.response){
                    console.error("Server responded with error: ", err.response.status, err.response.data);    
                } else if (err.request) {
                    console.error("No response received: ", err.request)
                } else {
                    console.error("Error setting up request: ", err.message)
                }
            }   
        }

        getReviews()
    },[user, token]);

    return(
        <>
        <br/>
            <h2>Your Reviews</h2>
            <div className = "review-Provider">

                {reviews.length === 0 ? (
                    <p>No reviews found.</p>
                    ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="review-card">
                            <p>Customer name: {review.reviewer?.userName}</p>
                            <p>Provider name: {review.reviewee?.userName}</p>
                            <p>Task: {review.service} </p>
                            <p>Task status: {review.taskStatus}</p>
                            <p>Rating: {review.rating}</p>
                            <p>Review: {review.comment}</p>
                        </div>
                    ))
                )}
                
            </div>

            <br/>
        </>
    );
}