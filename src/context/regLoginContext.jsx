// Import the tools, libraries and frameworks needed
import axios from 'axios';
import { createContext, useMemo, useContext } from 'react';
import { useCookies } from 'react-cookie';

// Create context
const AuthContext = createContext();

// Define the context provider function
export default function RegLoginProvider ({ children}) {
    const[cookies, setCookie, removeCookie] = useCookies(['token']);
    const backendConnectionStr = "http://localhost:3000/api";

// ========================  Register user ==============================================
    async function register(formData) {
        let response = await axios.post(`${backendConnectionStr}/auth/register`, formData);
        setCookie("token", response.data.token);

        // Fetch full user data after registration
        // const userResult = await axios.get(`${backendConnectionStr}/users/me`, {
        //     headers: { Authorization: `Bearer ${token}` },});
        // return { token, user: userResult.data };
    };

//=========================   Sign In ===================================================
    async function signin(formData) {
        let response = await axios.post(`${backendConnectionStr}/auth/signin`, formData);
        
        const { token, user } = response.data;
    
        // store token in cookies
        setCookie("token", token);

        // Return token and full user data
        return { token, user };
    } 

    //=========================   Sign Out ===================================================
    function logout(){
        removeCookie("token", { path: '/'});
    };

    // Memoize values
    const value = useMemo(() => ({
        cookies, 
        signin, 
        register, 
        logout,
        }), [cookies]);

        // Return the authprovider
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a hook to use the auth context
export function useAuth() {
    return useContext(AuthContext);
}


