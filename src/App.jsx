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
import MessagesPage from './pages/MessagesPage/MessagesPage';
import EditProfilePage from './pages/ProfilePage/EditProfilePage';

// Import Components
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Register from './components/Authenication/Register';
import SignIn from './components/Authenication/SignIn';
import Task from './components/Task/Task';
import Footer from './components/Footer/Footer';
import ProtectedRoutes from './components/ProtectedRoutes';

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
        <Route path="/auth/register" element={<Register/>}/>
        <Route path="/auth/signin" element={<SignIn/>}/>
        

        <Route element={<ProtectedRoutes/>}>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/task" element={<Task/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/message" element={<MessagesPage/>}/>
          <Route path="/edit-profile/:id" element={<EditProfilePage/>}/>
        </Route>
  
      </Routes>
      <Footer/>
     
    </>
  );
}

export default App
