// Get User role data and based on role, display different types of dashboards
// Add a possibility for users to Edit or Delete their profile
// pass data to this page using props and render it conditionally
// props: userData, Task, transaction, review 
import './Dashboard.css';
import Profile from '../Profile/Profile';
import Task from '../Task/Task';

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
            <h2>Welcome {name}. </h2>
            <Profile/>
            <br/>
            <Task/>

        </>
    )
}