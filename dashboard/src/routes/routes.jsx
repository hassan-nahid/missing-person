import {
    createBrowserRouter,
  } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../page/Home";
import Login from "../page/Login";
import AdminPrivateRoute from "./AdminPrivateRoute";
import ManageUser from "../page/ManageUser";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<AdminPrivateRoute><DashboardLayout/></AdminPrivateRoute>,
      children:[
        {
            path: "/",
            element: <Home/>,
        },
        {
          path: "/manage_user",
          element: <ManageUser/>,
        }

       
      ]
    },{
      path: "/login",
      element: <Login />,
    }
  ]);