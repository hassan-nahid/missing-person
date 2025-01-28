import {
    createBrowserRouter,
  } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../page/Home";
import Login from "../page/Login";
import AdminPrivateRoute from "./AdminPrivateRoute";
import ManageUser from "../page/ManageUser";
import AdminMessage from "../page/AdminMessage";
import AddAdmin from "../page/AddAdmin";
import UserDetails from "../components/User/UserDetails";
import VerifyUser from "../page/VerifyUser";
import MissingPostManage from "../page/MissingPostManage";
import FoundPostManage from "../page/FoundPostManage";
import AdminMissingDetails from "../components/Missing/AdminMissingDetails";
import AdminFoundDetails from "../components/Found/AdminFoundDetails";

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
        },
        {
          path: "/user_details/:id",
          element: <UserDetails/>,
        },
        {
          path: "/verify_user",
          element: <VerifyUser/>,
        },
        {
          path: "/missing_post_manage",
          element: <MissingPostManage/>,
        },
        {
          path: "/admin_missing_details/:id",
          element: <AdminMissingDetails/>,
        },
        {
          path: "/found_post_manage",
          element: <FoundPostManage/>,
        },
        {
          path: "/admin_found_details/:id",
          element: <AdminFoundDetails/>,
        },
        {
          path: "/admin_message",
          element: <AdminMessage/>,
        },
        {
          path: "/add_admin",
          element: <AddAdmin/>,
        },


       
      ]
    },{
      path: "/login",
      element: <Login />,
    }
  ]);