import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import SignUp from "../Pages/Auth/SignUp";
import Login from "../Pages/Auth/Login";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AllEvent from "../Pages/AllEvent/AllEvent";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AddEvent from "../Pages/Dashboard/AddEvent/AddEvent";
import AllEvents from "../Pages/Dashboard/AllEvents/AllEvent";
import EventDetails from "../Pages/Dashboard/AllEvents/EventDetails";
import Profile from "../Pages/Dashboard/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/allevent",
        element: (
          <PrivateRoute>
            <AllEvent />,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboardHome",
        element: <DashboardHome />,
      },
      {
        path: "dashboardAddEvent",
        element: <AddEvent />,
      },
      {
        path: "allEvent",
        element: <AllEvents />,
      },
      {
        path: "eventDetails/:id",
        element: <EventDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/events/${params.id}`),
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
