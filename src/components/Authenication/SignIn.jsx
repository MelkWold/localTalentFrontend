import './SignIn.css';
import { useState } from 'react';

export default function SignIn(){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        services: '',
        role: 'client',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get form data from the sign in form
        const form = e.target;
        const formData = newFormData(form);

        const email = formData.get("email");
        const password = formData.get("password");

        const allData = {
            email,
            password
        };

        // ===== Remove this at Production ======
        console.log('Form data', allData);
    }
    return(
        <section className ="signinContainer">
            <h1>Sign In</h1>

            <form className="signinForm" onSubmit = {handleSubmit}>
            <div className= "form-group">
                    <label htmlFor="email">Email: </label>
                    <input id="email" type="email" name="email" placeholder ="person@email.com" required />
                </div>
                

                <div className= "form-group">
                    <label htmlFor="password">Password: </label>
                    <input id="password" type="password" name="password" required />
                </div>
                <br/>
                <button>Signin</button>
            </form>
        </section>
    )
}