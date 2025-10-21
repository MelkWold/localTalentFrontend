// Import Hooks, Frameworks and Libraries
import axios from 'axios';
import { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import { useUser } from './context/userContext';
import './App.css';
import { useAuth } from "./context/regLoginContext";

// Import Pages
import SearchPage from './pages/SearchPage/SearchPage';
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import Homepage from './pages/HomePage/Homepage';

// Import Components
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Register from './components/Authenication/Register';
import SignIn from './components/Authenication/SignIn';
import Task from './components/Task/Task';
import Footer from './components/Footer/Footer';

function App() {
  const { cookies, logout } = useAuth();
  const { setUser, setRole } = useUser();
  
  async function getData() {
    let baseURL = 'http://localhost:3000/api';
    
    // if there is no token, do not fetch 
    if(!cookies?.token) return ;

    try {
      let userResponse = await axios.get(`${baseURL}/users/me`, { headers: { 'x-auth-token': cookies.token },
      });

      // Save user and their role in context
      setUser(userResponse.data);
      setRole(userResponse.data.role);
    } catch(err){
      console.error("Error fetching user:", err.message);
      logout();
    }
  }

  useEffect(() => {
    // Fetch user data on initial load and when the token cookie changes
      getData();
  }, [cookies, logout, setUser, setRole]);

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/task" element={<Task/>}/>
        <Route path="/auth/register" element={<Register/>}/>
        <Route path="/auth/signin" element={<SignIn/>}/>
        <Route path="/search" element={<SearchPage/>}/>
      </Routes>
      <Footer/>
     
    </>
  );
}

export default App
