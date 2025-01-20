import { createContext, useContext, useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";
import auth from "../firebase/firebase.config"; // Your Firebase config

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    const [currentUser, loading, error] = useAuthState(auth); 
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const [token] = useState(localStorage.getItem("token"));

    // Function to fetch user data
    const fetchUserData = async () => {
        if (currentUser) {
            try {
                const encodedEmail = encodeURIComponent(currentUser.email);
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/user/single/${encodedEmail}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include token in the Authorization header
                        },
                    }
                );

                setUserData(response.data); // Store user data in the state
            } catch (err) {
                console.error("Error fetching user data", err.response ? err.response.data : err.message);
            } finally {
                setIsLoading(false); // Stop loading regardless of success or failure
            }
        } else {
            setUserData(null); // No user logged in
            setIsLoading(false);
        }
    };

    // Initial fetch when user changes
    useEffect(() => {
        fetchUserData();
    }, [currentUser, token]);

    // Refetch when isProfileComplete changes
    useEffect(() => {
        if (userData?.isProfileComplete) {
            fetchUserData();
        }
    }, [userData?.isProfileComplete]);

    return (
        <UserContext.Provider value={{ currentUser, userData, loading, error, isLoading, refreshUserData: fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use user context
export const useUser = () => useContext(UserContext);
