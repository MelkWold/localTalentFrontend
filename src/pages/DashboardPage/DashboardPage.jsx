// Get User role data and based on role, display different types of dashboards
// Add a possibility for users to Edit or Delete their profile
// pass data to this page using props and render it conditionally
// props: userData, Task, transaction, review 

export default function DashboardPage(){
    let name = "Melkamu";
    return(
        <>
            <h1>Dashboard</h1>
            <h2>Welcome {name}. This is your Dashboard where you can see your detailed activities. </h2>
            <div className = "personalInfo">
                <h3>Personal Information</h3>
                <p>Name: </p>
                <p>Address: </p>
                <p>Services: </p>
            </div>

            <div className = "Tasks-Provider">
                <h3>Current and Past Tasks</h3>
                <p>Task: </p>
                <p>Task status: </p>
                <p>Payment status: </p>
                <p>Review: </p>
            </div>

            <div className = "Tasks-Customer">
                <h3>Services received</h3>
                <p>Task: </p>
                <p>Task status: </p>
                <p>Payment status: </p>
                <p>Review: </p>
            </div>



        </>
    )
}