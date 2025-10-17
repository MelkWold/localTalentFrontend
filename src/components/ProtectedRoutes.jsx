import AuthPage from '../pages/AuthPage/AuthPage';
import { useAuth } from '../context/regLoginContext'
import { Outlet } from 'react-router-dom';

export default function ProtectedRoutes(){
    const {cookies} = useAuth();

    return cookies.token? <Outlet/>:<AuthPage/>
}