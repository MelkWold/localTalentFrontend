// import { useState, useEffect } from 'react'
import Homepage from './pages/HomePage/Homepage';
import Navbar from './components/Navbar/Navbar';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import Register from './components/Authenication/Register';
import SignIn from './components/Authenication/SignIn';
import TaskPage from './pages/TaskPage/TaskPage';
import TransactionPage from './pages/TransactionPage/TransactionPage';



import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="/auth/register" element={<Register/>}/>
        <Route path="/auth/login" element={<SignIn/>}/>
        <Route path="/task" element={<TaskPage/>}/>
        <Route path="/transaction" element={<TransactionPage/>}/>
        
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
