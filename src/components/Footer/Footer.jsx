import "./Footer.css";

export default function Footer(){
    return(
        <div>
                <ul className="footer">
                    <li><p>&copy; {new Date(Date.now()).getFullYear()} Local Talent Matcher</p></li>
                    <li><a>Privacy</a></li>
                    <li><a>Terms</a></li>
                    <li><a>Contact</a></li>
                </ul>
            </div>
    )
}