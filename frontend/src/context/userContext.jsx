import { createContext, useContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config"; // Your Firebase config

// Create a context for the user
const UserContext = createContext();

// UserProvider component to wrap around your app
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    const [currentUser, loading, error] = useAuthState(auth); // Get the current user from Firebase
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (currentUser) {
            // Optionally, fetch additional user data from the backend if needed
            const fetchUserData = async () => {
                try {
                    const encodedEmail = encodeURIComponent(currentUser.email);
                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}/api/user/${encodedEmail}`
                    );
                    const data = await response.json();
                    setUserData(data); // Store user data in the state
                } catch (err) {
                    console.error("Error fetching user data", err);
                }
            };
            fetchUserData();
        } else {
            setUserData(null); // Clear user data when user logs out
        }
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ currentUser, userData, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use user context
export const useUser = () => useContext(UserContext);
