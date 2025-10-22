import { useUser } from '../../context/userContext';
import "./DashboardPage.css";
// Import Dashboard Components
import CustomerDashboard from "../../components/Dashboard/CustomerDashboard";
import ProviderDashboard from "../../components/Dashboard/ProviderDashboard";

export default function DashboardPage() {

    const { user } = useUser();

    // Debugging step
    // console.log(user)

    const loading = () => { 
        return <h1>Loading</h1>};
    const loaded = () => {
        return (
            <>
                <h1 className="DashboardHeader">Welcome {user?.userName || "User"}!</h1>
                {user?.role ==="Provider"? <ProviderDashboard/> : <CustomerDashboard/>}
            </>
        );
    };
    return user ? loaded() : loading();
};


