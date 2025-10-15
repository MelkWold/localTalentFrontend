import logoIcon from "../../assets/LocalTalentMatcher_Logo1.png";
import './Logo.css';

export default function Logo(){
    return(
        <div className= "Logo">
            <img className = "logoImg" src = {logoIcon} alt ="logoImage"/>
        </div>
    )
}