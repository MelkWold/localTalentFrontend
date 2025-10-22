// import
import { useState, useEffect } from "react";
import { useUser } from "../../context/userContext";
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import './EditProfilePage.css';

export default function EditProfile() {
    const { user, setUser } = useUser();
    const [cookies] = useCookies(["token"]);
    const navigate = useNavigate();
    const { id } = useParams();
    const baseURL = "http://localhost:3000/api";

    // Define state
    const [formData, setFormData] = useState ({
        userName: "",
        phone:"",
        role:"",
        userAddress: {
            city: "",
            state: "",
            country: "",
        }, 
        services: "",
    });

    // Load current user information
    useEffect(() => {
        if(!user || user._id !== id) return;

        setFormData({
            userName: user.userName || "",
            phone: user.phone || "",
            role: user.role || "",
            userAddress: {
                city: user.userAddress?.city || "",
                state: user.userAddress?.state || "",
                country: user.userAddress?.country || "",
            }, 
            services: user.services?.join(", ") || "",
        });
    }, [user, id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if(["city", "state", "country"].includes(name)) {
            setFormData((prev) => ({
                ...prev,
                userAddress: { ...prev.userAddress, [name]: value },
            }));
        } else {
            setFormData((prev) => ({
                ...prev, [name]: value }));
        }
    };

    // Submit updated profile
    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitData = {
            ...formData,
            services: 
            formData.role === "Provider" ? formData.services
                                                    .split(",")
                                                    .map((s) => s.trim())
                                                    .filter((s) => s !== "") : [],
        };


        try {
            const response = await axios.put(`${baseURL}/users/${id}`, submitData, {
                headers: { "x-auth-token": cookies.token }, 
            });

            setUser(response.data);
            alert("Profile updated");
            navigate("/dashboard");
        } catch (err) {
            console.error("Error updating profile", err.response?.data || err.message);
            alert("Failed to update profile. Please try again.")
        }
    };


    return (
        <>
            <h2>Edit Profile</h2>
            <div className="editProfileCard">
            <form className= "editProfileForm" onSubmit={handleSubmit}>
                <label>Full Name: 
                    <input 
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>Phone: 
                    <input 
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        />
                    </label>
            

                    <label>City: 
                    <br/>
                    <input 
                        type="text"
                        name="city"
                        value={formData.userAddress.city}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>State:
                    <br/> 
                    <input 
                        type="text"
                        name="state"
                        value={formData.userAddress.state}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    <label>Country:
                    <br/> 
                    <input 
                        type="text"
                        name="country"
                        value={formData.userAddress.country}
                        onChange={handleChange}
                        required
                        />
                    </label>

                    {formData.role === "Provider" && (
                        <label>Services (comma separated): 
                            <input 
                                type="text"
                                name="services"
                                value={formData.services}
                                onChange={handleChange}
                                required
                                />
                        </label>
                    )}

                    <button type="submit">Save changes</button>
            </form>
        </div>
        </>
        
    );
}