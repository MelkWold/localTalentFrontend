import RegLoginProvider from "./regLoginContext";
import UserProvider from './userContext';
import { CookiesProvider } from 'react-cookie';


export default function AppProvider({ children }) {
    return(
        <CookiesProvider>
            <UserProvider>
                <RegLoginProvider>{children}</RegLoginProvider>
            </UserProvider>
        </CookiesProvider>
    )
}