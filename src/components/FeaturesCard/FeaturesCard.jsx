import "./FeaturesCard.css";

export default function FeaturesCard({ imgSrc, alt, paragraph }){

    return(
        <div className="cardContainer">
            <div className="featuresCardDiv">
                <img className="featuresCardImg" src={imgSrc} alt={alt}/>
                <p className="featuresCardParagraph">{paragraph}</p>
            </div>
        </div>
        
        
    )
}