import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import CompleteProfile from "../pages/CompleteProfile";
import ErrorPage from "../pages/ErrorPage";
import Missing from "../pages/Missing";
import Found from "../pages/Found";
import MissingPost from "../components/Missing/MissingPost";
import PrivateRoute from "./PrivateRoute";
import MissingPostDetails from "../components/Missing/MissingPostDetails";
import PrivateProfileComplete from "./PrivateProfileComplete";
import Message from "../pages/Message";
import FoundPost from "../components/Found/FoundPost";
import FoundPostDetails from "../components/Found/FoundPostDetails";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import FoundPostUpdateStatus from "../components/Profile/FoundPostUpdateStatus";
import MissingPostUpdateStatus from "../components/Profile/MissingPostUpdateStatus";
import Analytics from "../pages/Analytics";
import MissingAdminReport from "../components/Missing/MissingAdminReport";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/missing",
        element: <Missing />,
      },
      {
        path: "/missing_post",
        element: <PrivateRoute><PrivateProfileComplete><MissingPost /></PrivateProfileComplete></PrivateRoute>,
      },
      {
        path: "/missing_post_details/:id",
        element: <PrivateRoute><MissingPostDetails /></PrivateRoute>,
      },
      {
        path: "/found",
        element: <Found />,
      },
      {
        path: "/found_post",
        element: <PrivateRoute><PrivateProfileComplete><FoundPost/></PrivateProfileComplete></PrivateRoute>,
      },
      {
        path: "/found_post_details/:id",
        element: <PrivateRoute><FoundPostDetails/></PrivateRoute>,
      },
      {
        path: "/about_us",
        element: <AboutUs/>,
      },
      {
        path: "/contact_us",
        element: <ContactUs/>,
      },
      {
        path: "/profile",
        element: <PrivateRoute><Profile /></PrivateRoute>,
      },
      {
        path: "/complete_profile",
        element: <PrivateRoute><CompleteProfile /></PrivateRoute>,
      },
      {
        path: "/message",
        element: <PrivateRoute><Message /></PrivateRoute>,
      },
      {
        path: "/found_post_update_status/:id",
        element: <PrivateRoute><PrivateProfileComplete><FoundPostUpdateStatus /></PrivateProfileComplete></PrivateRoute>,
      },
      {
        path: "/missing_post_update_status/:id",
        element: <PrivateRoute><PrivateProfileComplete><MissingPostUpdateStatus /></PrivateProfileComplete></PrivateRoute>,
      },
      {
        path: "/missing_admin_report/:id",
        element: <PrivateRoute><PrivateProfileComplete><MissingAdminReport/></PrivateProfileComplete></PrivateRoute>,
      },
      {
        path: "/found_admin_report/:id",
        element: <PrivateRoute><PrivateProfileComplete><MissingAdminReport/></PrivateProfileComplete></PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      }
    ]
  },
]);