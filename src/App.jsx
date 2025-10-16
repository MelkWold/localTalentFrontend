// import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './pages/HomePage/Homepage';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Register from './components/Authenication/Register';
import SignIn from './components/Authenication/SignIn';
import Task from './components/Task/Task';
import SearchPage from './pages/SearchPage/SearchPage';
//import MessagesPage from "./pages/MessagesPage/MessagesPage"
import './App.css';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/task" element={<Task/>}/>
        <Route path="/auth/register" element={<Register/>}/>
        <Route path="/auth/signin" element={<SignIn/>}/>
        
        <Route path="/search" element={<SearchPage/>}/>
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
