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
        element: <MissingPost />,
      },
      {
        path: "/found",
        element: <Found />,
      },
      {
        path: "/about",
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/complete_profile",
        element: <CompleteProfile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      }
    ]
  },
]);