// Imports
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../Logo/Logo';
import { useAuth } from "../../context/regLoginContext";
import { useUser } from "../../context/userContext";

export default function Navbar(){
    const { user } = useUser();
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/');
    }

    return (
            <div className = "navbardiv">
                <Logo/>
                <nav className = "navbar">
                    <ul className="navbarUl">
                        <li><h3><Link to={"/"}>Home</Link></h3></li>
                        {user ? (
                            <>
                                <li><h3><Link to={"/dashboard"}>Dashboard</Link></h3></li>
                                <li><h3><Link to={"/profile"}>Profile</Link></h3></li>
                                <li><h3><Link to={"/task"}>Tasks</Link></h3></li>
                                <li><h3><Link to={"/message"}>Message</Link></h3></li>
                                <li><h3><a onClick={handleLogout}>Logout</a></h3></li>
                            </>
                            ) : (
                                <>
                                <li><h3><Link to={"/auth/register"}>Register</Link></h3></li>
                                <li><h3><Link to={"/auth/signin"}>Sign In</Link></h3></li>
                                </>
                            )}     
                    </ul>
                </nav>
            </div>
    )
}
