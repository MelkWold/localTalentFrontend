import {useState} from 'react'; 
import './Register.css';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        services: '',
        role: 'client',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get form data from the form
        const form = e.target;
        const formData = newFormData(form);

        const email = formData.get("email");
        const password = formData.get("password");
        const services = formData.get("services")
        const role = formData.get("role");
    
        const allData = { 
            email,
            password,
            services,
            role,
        };

        console.log('Form data', allData);
    };
    

    return (
        <section className = "signupContainer">
            <h1>Signup</h1>
            <form className="signUpForm" onSubmit = {handleSubmit}>
                <div className= "form-group">
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" name="email" placeholder ="person@email.com" required />
                </div>
                

                <div className= "form-group">
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" name="password" required />
                </div>


                <div className= "form-group">
                    <label htmlFor="services">Services: </label>
                    <textarea id="services" name="services" placeholder='List your services separated by comma'/>
                </div>


                <fieldset>
                    <legend>Role: </legend>
                    <label>
                        <input type="radio" name="role" value= "Provider" />
                        Provider
                    </label>
                    <label>
                        <input type="radio" name="role" value= "Customer" />
                        Customer
                    </label>
                    <label>
                        <input type="radio" name="role" defaultChecked={true} value= "both" />
                        Provider and Customer
                    </label>
                </fieldset>

                <br/><br/>
                <button>Submit</button>

            </form>
        </section>
)
}