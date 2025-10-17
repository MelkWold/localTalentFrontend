// Import tools 
import './SignIn.css';
import { useState } from 'react';
import { useAuth } from "../../context/regLoginContext";
import { useNavigate } from "react-router-dom";

// Define the SignIn function
export default function Signin({ setNewUser }){
    const { signin } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // try to sign in the user and redirect to the dashboard
        try {
            await signin(formData);
            navigate('/dashboard');
        } catch(err) {
            console.error(err.message)
        }
    }

    function handleClick() {
        setNewUser(true);
    };

    return(
        <section className ="signinContainer">

            <form className="signinForm" onSubmit = {handleSubmit}>
            <div className= "form-group">
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" name="email" placeholder ="person@email.com" onChange={handleChange} required />
                </div>
                

                <div className= "form-group">
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" name="password" onChange={handleChange} required />
                </div>
                <input className="submit" type="submit" value="Sign In"/>
                <p>Forgot password? Click <a>here</a> to reset.</p>
                <p>Don't have an account? <button onClick={handleClick}>Sign Up</button></p>
            </form>
        </section>
    );
}