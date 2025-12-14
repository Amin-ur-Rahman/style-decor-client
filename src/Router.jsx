import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/homeLayout/HomeLayout";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import AddNewService from "./pages/service&role/service/AddNewService";
import Home from "./pages/Home/Home";
import PrivateRoute from "./protectedRoutes/PrivateRoute";
import ManageServices from "./pages/dahsboardPages/ManageServices";
import ServiceDetails from "./pages/Home/ServiceDetails";
import BookService from "./pages/service&role/service/BookService";
import MyBookings from "./pages/dahsboardPages/MyBookings";
import OnPaymentSuccess from "./pages/dahsboardPages/OnPaymentSuccess";
import PaymentHistory from "./pages/dahsboardPages/PaymentHistory";
import MyProfile from "./pages/dahsboardPages/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "service-details/:id",
        element: <ServiceDetails></ServiceDetails>,
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
      // normal users routes
      {
        path: "my-bookings",
        element: <MyBookings></MyBookings>,
      },
      {
        path: "on-payment-success",
        element: <OnPaymentSuccess></OnPaymentSuccess>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
    ],
  },
  {
    path: "/add-new-service",
    element: <AddNewService></AddNewService>,
  },
  {
    path: "/book-service/:serviceId",
    element: <BookService></BookService>,
  },
]);
export default router;
