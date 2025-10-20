// Import the tools, libraries and frameworks needed
import axios from 'axios';
import { createContext, useMemo, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useUser } from './userContext';
// Create context
const AuthContext = createContext();

// Define the context provider function
export default function RegLoginProvider ({ children}) {
    const[cookies, setCookie, removeCookie] = useCookies(['token']);
    const backendConnectionStr = "http://localhost:3000/api";
    const { setUser, setRole } = useUser();

// ========================  Register user ==============================================
    async function register(formData) {
        let response = await axios.post(`${backendConnectionStr}/auth/register`, formData);
        // Destructure token and user from response
        const { token, user } = response.data;

        // store token in cookies
        setCookie("token", token);

        // Update user context with the received data
        setUser(user);
        setRole(user.role);

        // Return token and full user data
        return { token, user };
    };

//=========================   Sign In ===================================================
    async function signin(formData) {
        let response = await axios.post(`${backendConnectionStr}/auth/signin`, formData);
        
        const { token, user } = response.data;
    
        // store token in cookies
        setCookie("token", token);

        // Update user context with the received data
        setUser(user);
        setRole(user.role);

        // Return token and full user data
        return { token, user };
    } 

    //=========================   Sign Out ===================================================
    function logout(){
        removeCookie("token");
        // clear user context on logout
        setUser(null);
        setRole(null);

    };

    // Memoize values
    const value = useMemo(() => ({
        cookies, 
        signin, 
        register, 
        logout,
        }), [cookies, setUser, setRole]);

        // Return the authprovider
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a hook to use the auth context
export function useAuth() {
    return useContext(AuthContext);
}


