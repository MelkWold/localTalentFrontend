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
        phone:'',
        userAddress: {
            city:'',
            state:'',
            country:'',
        },
        services: '',
        role: 'Provider',
    });

    // Debugging step
    //console.log(formData);

    // update formData using setFormData using data from  the signUp form
    function handleChange(e) {
        const { name, value } = e.target;
        if(name.startsWith('userAddress.')) {
            // Handle nested address fields 
            const addressField = name.split('.')[1];
            setFormData(prevData => ({
                ...prevData, 
                userAddress: {
                    ...prevData.userAddress,
                    [addressField]: value
                }
            }));
        } else {
            // Handle non-address fields
            setFormData({ ...formData, [name]: value })
        }
        
        // Debugging step
        if(name === 'role') console.log("Selected role:", value);
    }

    function handleClick(){
        if(typeof setNewUser === 'function') setNewUser(false);
    }

    async function handleSubmit (e) {
        e.preventDefault();

        try {
            if(formData.password !== formData.passwordConfirm){
                alert("Passwords should match");
                throw new Error("Passwords should match!");
            }
            
            // prepare data for submission
            // convert services string to an array
            const submitData = {
                ...formData, 
                services: formData.role === "Provider" ? 
                    formData.services.split(',').map(service => service.trim()).filter(service => service !== '') : []
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
                    <label htmlFor="phone">Phone: </label>
                    <input 
                        id="phone" 
                        type="tel" 
                        name="phone" 
                        onChange={handleChange} 
                        value={formData.phone} 
                        placeholder='+1-234-567-8900' 
                        required />
                </div>

                <div className = "address-form">
                <div className= "form-group">
                    <label htmlFor="userAddress.city">City: </label>
                    <input 
                        id="userAddress.city" 
                        type="text" 
                        name="userAddress.city" 
                        onChange={handleChange} 
                        value={formData.userAddress.city} 
                        placeholder='City' 
                        required />
                </div>

                <div className= "form-group">
                    <label htmlFor="userAddress.state">State: </label>
                    <input 
                        id="userAddress.state" 
                        type="text" 
                        name="userAddress.state" 
                        onChange={handleChange} 
                        value={formData.userAddress.state} 
                        placeholder='State' 
                        required />
                </div>

                <div className= "form-group">
                    <label htmlFor="userAddress.country">Country: </label>
                    <input 
                        id="userAddress.country" 
                        type="text" 
                        name="userAddress.country" 
                        onChange={handleChange} 
                        value={formData.userAddress.country} 
                        placeholder='Country' 
                        required />
                </div>
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
            >Already have an account? <button className="authRedirect" onClick={handleClick}><a href ="/auth/signin">Sign In</a></button></p>
        </section>
)
}