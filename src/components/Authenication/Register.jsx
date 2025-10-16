import {useState} from 'react'; 
import './Register.css';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    //const { signUp } = useAuth(); 
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        userName:'',
        email: '',
        password: '',
        passwordConfirm:'',
        services: '',
        role: '',
    });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]:e.target.value })
    }
    // Check where the setNewUser prop is coming from
    function handleClick(){
        setNewUser(false);
    }

    async function handleSubmit (e) {
        e.preventDefault();

        try {
            if(formData.password !== formData.passwordConfirm)
                throw new Error("Passwords should match!");
            //await signUp(formData);

            navigate("/dashboard");

        } catch(err){
            console.error(err.message);
        }
        // Get form data from the Signup form
        // const form = e.target;
        // const formData = new FormData(form);
        // const userName = formData.get("userName");
        // const email = formData.get("email");
        // const password = formData.get("password");
        // const passwordConfirm = formData.get("password");
        // const services = formData.get("services")
        // const role = formData.get("role");
    
        // const allData = { 
        //     userName,
        //     email,
        //     password,
        //     passwordConfirm,
        //     services,
        //     role,
        // };
        // setFormData(...formData, allData);
        //====== Remove this at production======
        console.log('Form data', formData);
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
                    <input id="passwordpasswordConfirm" type="password" name="passwordpasswordConfirm" onChange={handleChange}required />
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