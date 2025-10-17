import {useState} from 'react'; 
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/regLoginContext';

export default function Register() {
    const { register } = useAuth(); 
    const navigate = useNavigate()
    // set the initial state of formData to empty values 
    const [formData, setFormData] = useState({
        userName:'',
        email: '',
        password: '',
        passwordConfirm:'',
        services: '',
        role: 'Customer',
    });
    // update formData using setFormData using data from  the signUp form
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]:e.target.value });
        if(e.target.name === 'role') console.log("Selected role:", e.target.value);
    }

    console.log(formData);

    // Check where the setNewUser prop is coming from
    function handleClick(){
        setNewUser(false);
    }

    async function handleSubmit (e) {
        e.preventDefault();

        try {
            if(formData.password !== formData.passwordConfirm)
                throw new Error("Passwords should match!");
            
            // Register the user and navigate them to the dashboard
            await register(formData);

            navigate("/dashboard");

        } catch(err){
            console.error(err.message);
        }
    };
    

    return (
        <section className = "signupContainer">
            <h1>Register</h1>
            <form className="signUpForm" onSubmit = {handleSubmit}>
                <div className= "form-group">
                    <label htmlFor="userName">Username: </label>
                    <input id="userName" type="text" name="userName" placeholder ="Username" onChange={handleChange} required />
                </div>

                <div className= "form-group">
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" name="email" placeholder ="person@email.com" onChange={handleChange} required />
                </div>
                
                <div className= "form-group">
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" name="password" onChange={handleChange}required />
                </div>

                <div className= "form-group">
                    <label htmlFor="passwordConfirm">Confirm Password: </label>
                    <input id="passwordConfirm" type="password" name="passwordConfirm" onChange={handleChange}required />
                </div>

                <div className= "form-group">
                    <label htmlFor="services">Services: </label>
                    <textarea id="services" name="services" placeholder='List your services separated by comma' onChange={handleChange}/>
                </div>

                <fieldset>
                    <legend>Role: </legend>
                    <label>
                        <input type="radio" name="role" value= "Provider" onChange={handleChange} defaultChecked={true}/>
                        Provider
                    </label>
                    <label>
                        <input type="radio" name="role" value= "Customer" onChange={handleChange}/>
                        Customer
                    </label>
                </fieldset>

                <input className="submit" type="submit" value ="Sign Up"/>

            </form>
            <hr/>
            
            <p style ={{border:"1px solid black", paddingLeft: "20px", paddingRight: "20px"}}
            >Already have an account? <button onClick={handleClick}>Sign In</button></p>
        </section>
)
}