import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/homeLayout/HomeLayout";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import AddNewService from "./pages/service&role/service/AddNewService";
import Home from "./pages/Home/Home";
import PrivateRoute from "./protectedRoutes/PrivateRoute";

import ServiceDetails from "./pages/Home/ServiceDetails";
import MyBookings from "./pages/dahsboardPages/MyBookings";
import OnPaymentSuccess from "./pages/dahsboardPages/OnPaymentSuccess";
import PaymentHistory from "./pages/dahsboardPages/PaymentHistory";
import MyProfile from "./pages/dahsboardPages/MyProfile";
import BeADecorator from "./pages/service&role/role/BeADecorator";
import ManageServices from "./pages/dahsboardPages/admin/ManageServices";
import ManageDecorators from "./pages/dahsboardPages/admin/ManageDecorators";
import ManageBookings from "./pages/dahsboardPages/admin/ManageBookings";
import Services from "./pages/Services";
import Coverage from "./components/home/Coverage";
import DecoratorProfile from "./pages/dahsboardPages/decorator/DecoratorProfile";
import AssignedProjects from "./pages/dahsboardPages/decorator/AssignedProjects";
import DecoratorLandingPage from "./pages/dahsboardPages/decorator/DecoratorLandingPage";
import EarningsSummary from "./pages/dahsboardPages/decorator/EarningsSummary";

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
      {
        path: "services",
        element: <Services></Services>,
      },
      {
        path: "coverage",
        element: <Coverage></Coverage>,
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
      // admin  pages----------------
      {
        path: "admin/services",
        element: <ManageServices></ManageServices>,
      },
      {
        path: "manage-decorators",
        element: <ManageDecorators></ManageDecorators>,
      },
      {
        path: "manage-bookings",
        element: <ManageBookings></ManageBookings>,
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

      // decorator pages
      {
        path: "decorator-home",
        element: <DecoratorLandingPage></DecoratorLandingPage>,
      },
      {
        path: "decorator/profile",
        element: <DecoratorProfile></DecoratorProfile>,
      },
      {
        path: "decorator/assigned-projects",
        element: <AssignedProjects></AssignedProjects>,
      },
      {
        path: "decorator/earnings",
        element: <EarningsSummary></EarningsSummary>,
      },
    ],
  },
  {
    path: "/add-new-service",
    element: <AddNewService></AddNewService>,
  },
  // {
  //   path: "/book-service/:serviceId",
  //   element: <BookService></BookService>,
  // },
  {
    path: "/become-decorator",
    element: <BeADecorator></BeADecorator>,
  },
]);
export default router;
