import logoIcon from '../../assets/LocalTalentMatcher_Logo1.png';
import local from '../../assets/FeaturesCardIcons/local.svg';
import community from '../../assets/FeaturesCardIcons/community.svg';
import trust from '../../assets/FeaturesCardIcons/trustworthy.svg';
import FeaturesCard from '../../components/FeaturesCard/FeaturesCard';

import './HomePage.css';

export default function Homepage(){

    return(
        <>
            <div className="HeroSection">
                <h1>Welcome to Local Talent Matcher</h1>
                <h2>A commmunity-driven way of connecting local talent with local community creating additional income-generation mechanism and trust-based service. </h2>
            </div>
            <div>
                <h1>Here is why we matter!</h1>

                <div className="cardContainer">
                
                <FeaturesCard 
                    imgSrc = {local} 
                    alt= {"local icon"} 
                    paragraph = {"Connecting local talent and skills with customers." }
                    />
                <FeaturesCard 
                    imgSrc = {community} 
                    alt= {"community icon"} 
                    paragraph = {"Opportunity for service delivery that enhances local communities."} />
                <FeaturesCard 
                    imgSrc = {trust} 
                    alt= {"trust icon"} 
                    paragraph = {"Trustworthy interaction with members of your community."}
                    />
            </div>
            </div>
            
            <button>Get Started Today!</button>
            <div>
                <ul className="footer">
                    <li><p>&copy; {new Date(Date.now()).getFullYear()} Local Talent Matcher</p></li>
                    <li><a>Privacy Policy</a></li>
                    <li><a>Terms of Use</a></li>
                    <li><a>Contact</a></li>
                </ul>
            </div>
            
        </>
    )
}