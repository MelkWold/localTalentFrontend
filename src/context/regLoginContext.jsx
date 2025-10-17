// Import the tools, libraries and frameworks needed
import axios from 'axios';
import { createContext, useMemo, useContext } from 'react';
import { useCookies } from 'react-cookie';

// Create context
const AuthContext = createContext();
const backendConnectionStr = "http://localhost:3000/api";

// Define the context provider function
export default function RegLoginProvider ({ children}) {
    const[cookies, setCookies, removeCookie] = useCookies(['token']);

// Register user and update the cookies with the registration token
    async function register(formData) {
        let response = await axios.post(`${backendConnectionStr}/auth/register`, formData);
        setCookies("token", response.data.token);
    };


    // Define a login function and update the cookies with the signin token
    async function signin(formData) {
        let response = await axios.post(`${backendConnectionStr}/auth/signin`, formData);
        setCookies("token", response.data.token);
    } 

    // Define the logout function
    function logout(){
        ["token"].forEach((token) => removeCookie(token));
    };

    // Memoize values
    const value = useMemo(() => ({
        cookies, signin, register, logout,
        }), [cookies]);

        // Return the authprovider
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a hook to use the auth context
export function useAuth() {
    return useContext(AuthContext);
}


