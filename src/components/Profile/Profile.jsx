// has to take some props 
// conditionally render "contact provider" or "Edit Profile" and "Delete Profile" buttons

import './Profile.css';

export default function Profile(){
    let name = "Melkamu Woldemariam";
    let address = { 
        street:"123 Astor Lane",
        city: "Franklin Park",
        state: "NJ",
        country: "USA"};
    let phone = "123-456-7890";
    let services = ["Software", "Data Analytics", "Science", "Consultancy"]
    let reviews = "Pending"

    return (
        <>
            <div className = "profileCard">
            <div >
                <h2>Provider Information</h2>
                <p>{name} </p>
                <p>{address.street}, {address.city}, {address.state}, {address.country}  </p>
                <p>{phone}</p>
                <p>{services[0]}, {services[1]}, {services[2]}, {services[3]} </p>
                <p>Brief Bio</p>
                <p>{reviews}</p>
                <div className="forPublicProfile">
                    <button>Contact provider</button>
                </div>
                <div className="forDashboard">
                    <button>Edit Profile</button>
                    <button>Delete Profile</button>
                </div>
            </div><br/>
            </div>
        </>
    )
}