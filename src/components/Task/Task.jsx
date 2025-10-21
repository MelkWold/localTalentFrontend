// To be redered conditionally based on type of user
import "./Task.css";
import { useState, useEffect } from 'react';
import { useUser } from "../../context/userContext";
import axios from 'axios';
import { useAuth } from '../../context/regLoginContext';

export default function Task(){

    // define the states and user
    const [tasks, setTasks] = useState([]);
    const { user } = useUser();
    const { cookies } = useAuth();
    const token = cookies.token;
    let baseURL = "http://localhost:3000/api/tasks";
    
    // Debugging step
    // console.log(user);

    useEffect(() => {
        if(!user?._id) {
            // Debugging step
            console.warn("No user logged in yet");
            return;
        }

        // Fetch tasks
        async function getTasks() {
            try {
               // const token = localStorage.getItem("token");

                // Debugging step
                console.log("Fetching tasks for user", user._id);
                console.log("Token:", token);

                const response = await axios.get(`${baseURL}/mytasks`, { 
                    headers: { "x-auth-token": token }, 
            });

                setTasks(response.data);
            } catch(err) {
                console.error("Error fetching tasks:", err.message)
            }   
        }

        getTasks()
    },[user?._id, token]);

    return(
        <>
        <br/>
            <h2>Your Tasks</h2>
            <div className = "tasks-Provider">
                {tasks.length === 0 ? (
                    <p>No tasks found.</p>
                    ) : (
                    tasks.map((task) => (
                        <div key={task._id} className="task-card">
                            <p>Customer name: {task.customer?.userName}</p>
                            <p>Provider name: {task.provider?.userName}</p>
                            <p>Task: {task.service} </p>
                            <p>Task status: {task.taskStatus}</p>
                            <p>Payment amount: ${task.amountPaid}</p>
                            <p>Payment status: {task.paymentStatus}</p>
                            <button>Update Task</button>
                        </div>
                    ))
                )}
                
            </div>

            <br/>
        </>
    );
}