import './Navbar.css';
import { Link } from "react-router-dom";
import Logo from '../Logo/Logo'
export default function Navbar(){
    
    return (
        <div className = "navbardiv">
            <Logo/>
            <nav className = "navbar">
                <ul className="navbarUl">
                    <li><h3><Link to={"/"}>Home</Link></h3></li>
                    <li><h3><Link to={"/dashboard"}>Dashboard</Link></h3></li>
                    <li><h3><Link to={"/auth/register"}>Register</Link></h3></li>
                    <li><h3><Link to={"/auth/signin"}>Sign In</Link></h3></li>
                </ul>
            </nav>
        </div>
        
    )
}