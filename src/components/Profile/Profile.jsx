// has to take some props 
import './Profile.css';

export default function Profile(){
    let name = "Melkamu Woldemariam";
    let address = { 
        street:"123 Astor Lane",
        city: "Franklin Park",
        state: "NJ",
        country: "USA"};
    let services = ["Software", "Data Analytics", "Science", "Consultancy"]
    let reviews = "Pending"

    return (
        <>
            <div className = "profileCard">
            <div >
                <h2>Provider Information</h2>
                <p>{name} </p>
                <p>{address.street}, {address.city}, {address.state}, {address.country}  </p>
                <p>{services[0]}, {services[1]}, {services[2]}, {services[3]} </p>
                <p>Brief Bio</p>
                <p>{reviews}</p>
                <button>Contact provider</button>
            </div><br/>
            </div>
        </>
    )
}