import { useUser } from '../../context/userContext';
import "./ProfilePage.css";
// Import Dashboard Components
import CustomerPublicProfile from "../../components/Dashboard/CustomerPublicProfile";
import ProviderPublicProfile from "../../components/Dashboard/ProviderPublicProfile";

export default function ProfilePage() {

    const { user } = useUser();

    const loading = () => { 
        return <h1>Loading</h1>};
    const loaded = () => {
        return (
            <>
                <h1 className="ProfileHeader">Welcome {user?.userName || "User"}!</h1>
                {user?.role ==="Provider"? <ProviderPublicProfile/> : <CustomerPublicProfile/>}
            </>
        );
    };
    return user ? loaded() : loading();
};


