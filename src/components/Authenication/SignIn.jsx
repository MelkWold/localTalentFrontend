// Import tools 
import './SignIn.css';
import { useState } from 'react';
import { useAuth } from "../../context/regLoginContext";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../context/userContext';


// Define the SignIn function
export default function Signin({ setNewUser }){
    const { signin } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null); 
    const { setUser, setRole } = useUser();


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // try to sign in the user and redirect to the dashboard
        try {
            const { token, user } = await signin(formData); // signin a user with formData and when successful fetch token and full userdata
            setUser(user); // update user context
            setRole(user.role); // update role context
            setError(null) // clear previous error if any
            navigate('/dashboard'); // redirect after successful login
        } catch(err) {
            console.error(err.message);
            setError("Invalid credentials");
        }
    }

    function handleClick() {
        if(typeof setNewUser === 'function') setNewUser(true);
    };

    return(
        <section className ="signinContainer">
            <form className="signinForm" onSubmit = {handleSubmit}>
                <div className= "form-group">
                        <label htmlFor="email">Email: </label>
                        <input 
                            id="email" 
                            type="email" 
                            name="email" 
                            placeholder ="person@email.com" 
                            onChange={handleChange}
                            value={formData.email} 
                            required

                        />
                </div>
                    

                <div className= "form-group">
                    <label htmlFor="password">Password: </label>
                    <input 
                        id="password" 
                        type="password" 
                        name="password" 
                        onChange={handleChange}
                        value={formData.password} 
                        required
                        minLength="8"
                    />
                </div>

                {error && <p className = "errorMsg">{error}</p>}

                <input className="submit" type="submit" value="Sign In"/>
                <p>Forgot password? Click <a>here</a> to reset.</p>
                <p>
                    Don't have an account? 
                    <button className="authRedirect" type="button" onClick={handleClick}><a href ="/auth/register">Sign Up</a></button>
                </p>
            </form>
        </section>
    );
}