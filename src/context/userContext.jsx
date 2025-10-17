import { useContext, createContext, useState } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    const value = {
        user,
        setUser,
        role,
        setRole,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
    return useContext(UserContext);
}