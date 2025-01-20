import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";

const PrivateProfileComplete = ({ children }) => {
  const location = useLocation();
  const { userData } = useUser();

  if (!userData?.isProfileComplete) {
    // Show a toast notification before navigating
    toast.error("Please complete your profile to access this page.");
    return (
      <Navigate to={"/complete_profile"} state={{ from: location }} replace />
    );
  }

  return children;
};

export default PrivateProfileComplete;
