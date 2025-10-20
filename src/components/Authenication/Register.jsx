import './Register.css';
import {useState} from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/regLoginContext';

export default function Register({ setNewUser }) {
    const { register } = useAuth(); 
    const navigate = useNavigate()
    // set the initial state of formData to empty values 
    const [formData, setFormData] = useState({
        userName:'',
        email: '',
        password: '',
        passwordConfirm:'',
        services: '',
        role: 'Provider',
    });

    // Debugging step
    console.log(formData);

    // update formData using setFormData using data from  the signUp form
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]:e.target.value });
        
        // Debugging step
        if(e.target.name === 'role') console.log("Selected role:", e.target.value);
    }

    function handleClick(){
        if(typeof setNewUser === 'function') setNewUser(false);
    }

    async function handleSubmit (e) {
        e.preventDefault();

        try {
            if(formData.password !== formData.passwordConfirm)
                throw new Error("Passwords should match!");
            
            // prepare data for submission
            // convert services string to an array
            const submitData = {
                ...formData, 
                services: formData.role === "Provider" ? formData.services.split(',').map(service => service.trim()).filter(service => service !== '') : []
            };
            
            // Debugging step
            console.log("Data being sent to backend", submitData);

            // Register the user and navigate them to the dashboard
            await register(submitData);

            navigate("/dashboard");

        } catch(err){
            console.error("Registration error: ", err.message);
        }
    };
    

    return (
        <section className = "signupContainer">
            <h1>Register</h1>
            <form className="signUpForm" onSubmit = {handleSubmit}>
                <div className= "form-group">
                    <label htmlFor="userName">Username: </label>
                    <input 
                        id="userName" 
                        type="text" 
                        name="userName" 
                        placeholder ="Username" 
                        onChange={handleChange} 
                        value={formData.userName} 
                        required />
                </div>

                <div className= "form-group">
                    <label htmlFor="email">Email: </label>
                    <input 
                        id="email" 
                        type="email" 
                        name="email" 
                        placeholder="person@email.com" 
                        onChange={handleChange} 
                        value={formData.email} 
                        required />
                </div>
                
                <div className= "form-group">
                    <label htmlFor="password">Password: </label>
                    <input 
                        id="password" 
                        type="password" 
                        name="password" 
                        onChange={handleChange} 
                        value={formData.password} 
                        minLength="8" 
                        required />
                </div>

                <div className= "form-group">
                    <label htmlFor="passwordConfirm">Confirm Password: </label>
                    <input 
                        id="passwordConfirm" 
                        type="password" 
                        name="passwordConfirm" 
                        onChange={handleChange} 
                        value={formData.passwordConfirm} 
                        minLength="8" 
                        required />
                </div>

                <div className= "form-group">
                    <label htmlFor="services">Services: </label>
                    <textarea 
                        id="services" 
                        name="services" 
                        placeholder='List your services separated by comma' 
                        onChange={handleChange} 
                        value={formData.services}
                        required={formData.role ==="Provider"}
                        />
                </div>

                <fieldset>
                    <legend>Role: </legend>
                    <label>
                        <input 
                            type="radio" 
                            name="role" 
                            value= "Provider" 
                            onChange={handleChange} 
                            checked={formData.role==='Provider'} />
                        Provider
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="role"    
                            value= "Customer" 
                            onChange={handleChange} 
                            checked={formData.role==='Customer'}/>
                        Customer
                    </label>
                </fieldset>

                <input 
                    className="submit" 
                    type="submit" 
                    value ="Sign Up"/>

            </form>
            <hr/>
            
            <p style ={{border:"1px solid black", paddingLeft: "20px", paddingRight: "20px"}}
            >Already have an account? <button onClick={handleClick}>Sign In</button></p>
        </section>
)
}