import { useUser } from '../../context/userContext';

// Import Dashboard Components
import CustomerDashboard from "../../components/Dashboard/CustomerDashboard";
import ProviderDashboard from "../../components/Dashboard/ProviderDashboard";

export default function DashboardPage() {

    const { user } = useUser();

    console.log(user)

    const loading = () => { 
        return <h1>Loading</h1>};
    const loaded = () => {
        return (
            <>
                <h1>Welcome {user?.userName || "User"}!</h1>
                {user?.role ==="Provider"? <ProviderDashboard/> : <CustomerDashboard/>}
            </>
        );
    };
    return user ? loaded() : loading();
};


