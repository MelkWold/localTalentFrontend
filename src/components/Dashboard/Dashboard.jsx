// Get User role data and based on role, display different types of dashboards
// Add a possibility for users to Edit or Delete their profile
// pass data to this page using props and render it conditionally
// props: userData, Task, transaction, review 
import './Dashboard.css';

export default function DashboardPage(){
    // ======Temporary placeholder---replace dynamically
    let name = "Melkamu Woldemariam";
    let address = "123 Astor Lane, NJ, USA";
    let services = ["Software", "Data Analytics", "Science", "Education", "Leadership", "Consultancy"]

    let task = "Data Analytics";
    let taskStatus= "In Progress";
    let paymentStatus = "Pending";
    let paymentAmount = "3680";
    let review = "Pending"
    //=================================================
    return(
        <>
            <h1>Dashboard</h1>
            <h2>Welcome {name}. </h2><br/>
            <div className = "personalInfo">
                <h3>Personal Information</h3>
                <p>{name} </p>
                <p>{address} </p>
                <p>{services}</p>
                <button>Edit Profile</button>
                <button>Delete Profile</button>
            </div><br/>

            <div className = "tasks-Provider">
                <h3>Current and Past Tasks</h3>
                <p>Task: {task} </p>
                <p>Task status: {taskStatus}</p>
                <p>Payment amount: {paymentAmount}</p>
                <p>Payment status: {paymentStatus}</p>
                <p>Review: {review} </p>
                <button>Update Task</button>
            </div><br/>

            <div className = "tasks-Customer">
                <h3>Services received</h3>
                <div className ="serviceCard">
                    <p>Task: {task}</p>
                    <p>Task status:{taskStatus} </p>
                    <p>Payment amount: {paymentAmount}</p>
                    <p>Payment status: {paymentStatus}</p>
                    <p>Review: {review}</p>
                </div>
                
                <button>Update</button>
            </div><br/>



        </>
    )
}