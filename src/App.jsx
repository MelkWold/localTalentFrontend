import axios from 'axios';
import { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom";
import Homepage from './pages/HomePage/Homepage';
import Navbar from './components/Navbar/Navbar';
import { useUser } from './context/userContext';
import Profile from './components/Profile/Profile';
import Register from './components/Authenication/Register';
import SignIn from './components/Authenication/SignIn';
import Task from './components/Task/Task';
import SearchPage from './pages/SearchPage/SearchPage';
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import './App.css';
import { useAuth } from "./context/regLoginContext";


function App() {
  const { cookies, logout } = useAuth();
  const { setUser, setRole } = useUser();
  let baseURL = 'http://localhost:3000/api';

  async function getData() {
    // if there is no token, do not fetch 
    if(!cookies?.token) return ;

    try {
      const userResponse = await axios.get(`${baseURL}/users/me`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
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
    if(cookies?.token) {
      getData();
    }
  }, [cookies]);

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
     
    </>
  );
}

export default App
