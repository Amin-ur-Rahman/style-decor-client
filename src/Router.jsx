import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/homeLayout/HomeLayout";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import AddNewService from "./pages/service&role/AddNewService";
import Home from "./pages/Home/Home";
import PrivateRoute from "./protectedRoutes/PrivateRoute";
import ManageServices from "./pages/dahsboardPages/ManageServices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/registration",
    element: <Registration></Registration>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin/services",
        element: <ManageServices></ManageServices>,
      },
    ],
  },
  {
    path: "/add-new-service",
    element: <AddNewService></AddNewService>,
  },
]);
export default router;
