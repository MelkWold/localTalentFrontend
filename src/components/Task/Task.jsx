// to be redered conditionally based on type of user
import "./Task.css";

export default function Task(){
    let customer= "Buju Banton";
    let provider = "Melkamu Woldemariam"
    let task = "Data Analytics";
    let taskStatus= "In Progress";
    let paymentStatus = "Pending";
    let paymentAmount = "3680";
    let review = "Pending";


    return(
        <>
        <br/>
            <div className = "tasks-Provider">
                <h3>Current and Past Tasks</h3>
                <p>Customer name: {customer}</p>
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
                    <p>Provider name: {provider}</p>
                    <p>Task: {task}</p>
                    <p>Task status:{taskStatus} </p>
                    <p>Payment amount: {paymentAmount}</p>
                    <p>Payment status: {paymentStatus}</p>
                    <p>Review: {review}</p>
                </div>
                
                <button>Update</button>
                <br/>
            </div>
        </>
    )
}