import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AdminPrivateRoute = ({children}) => {
    const location = useLocation()

    const token = localStorage.getItem("adminToken");

    if(!token){
        return <Navigate to={"/login"} state={{from : location}} replace/>
    }
    return children
};

export default AdminPrivateRoute;