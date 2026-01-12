import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/homeLayout/HomeLayout";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import AddNewService from "./pages/service&role/service/AddNewService";
import Home from "./pages/Home/Home";
import PrivateRoute from "./protectedRoutes/PrivateRoute";

import ServiceDetails from "./pages/Home/ServiceDetails";
import OnPaymentSuccess from "./pages/dahsboardPages/OnPaymentSuccess";
import PaymentHistory from "./pages/dahsboardPages/PaymentHistory";
import MyProfile from "./pages/dahsboardPages/MyProfile";
import BeADecorator from "./pages/service&role/role/BeADecorator";
import ManageServices from "./pages/dahsboardPages/admin/ManageServices";
import ManageDecorators from "./pages/dahsboardPages/admin/ManageDecorators";
import ManageBookings from "./pages/dahsboardPages/admin/ManageBookings";
import Services from "./pages/Services";

import DecoratorProfile from "./pages/dahsboardPages/decorator/DecoratorProfile";
import AssignedProjects from "./pages/dahsboardPages/decorator/AssignedProjects";
import DecoratorLandingPage from "./pages/dahsboardPages/decorator/DecoratorLandingPage";
import EarningsSummary from "./pages/dahsboardPages/decorator/EarningsSummary";
import CoveragePage from "./pages/CoveragePage";
import AdminLandingPage from "./pages/dahsboardPages/admin/AdminLandingPage";
import About from "./pages/About";
import SearchResultPage from "./pages/SearchResultPage";
import BookingHistory from "./pages/dahsboardPages/admin/BookingHistory";
import UserLandingPage from "./pages/dahsboardPages/UserLandingPage";
import ErrorPage from "./pages/ErrorPage";
import DashboardRedirect from "./pages/dahsboardPages/DashboardRedirect";
import AdminRoute from "./protectedRoutes/AdminRoute";
import DecoratorRoute from "./protectedRoutes/DecoratorRoute";
import PaymentHistoryUni from "./pages/PaymentHistoryUni";
import ContactPage from "./pages/ContactPage";

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
        element: <CoveragePage></CoveragePage>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "search",
        element: <SearchResultPage></SearchResultPage>,
      },
      {
        path: "contact",
        element: <ContactPage></ContactPage>,
      },
      {
        path: "/become-decorator",
        element: (
          <PrivateRoute>
            <BeADecorator></BeADecorator>
          </PrivateRoute>
        ),
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
        index: true,
        element: <DashboardRedirect></DashboardRedirect>,
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminLandingPage></AdminLandingPage>
          </AdminRoute>
        ),
      },
      {
        path: "manage-services",
        element: (
          <AdminRoute>
            <ManageServices></ManageServices>
          </AdminRoute>
        ),
      },
      {
        path: "manage-decorators",
        element: (
          <AdminRoute>
            <ManageDecorators></ManageDecorators>
          </AdminRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <AdminRoute>
            <ManageBookings></ManageBookings>
          </AdminRoute>
        ),
      },
      {
        path: "booking-history",
        element: (
          <AdminRoute>
            <BookingHistory></BookingHistory>
          </AdminRoute>
        ),
      },
      // normal users routes
      {
        path: "user",
        element: <UserLandingPage></UserLandingPage>,
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
        element: (
          <DecoratorRoute>
            <DecoratorLandingPage></DecoratorLandingPage>
          </DecoratorRoute>
        ),
      },
      {
        path: "decorator/profile",
        element: (
          <DecoratorRoute>
            <DecoratorProfile></DecoratorProfile>
          </DecoratorRoute>
        ),
      },
      {
        path: "decorator/assigned-projects",
        element: (
          <DecoratorRoute>
            <AssignedProjects></AssignedProjects>
          </DecoratorRoute>
        ),
      },
      {
        path: "decorator/earnings",
        element: (
          <DecoratorRoute>
            <EarningsSummary></EarningsSummary>
          </DecoratorRoute>
        ),
      },
      {
        path: "payment/history/admin/decorator",
        element: <PaymentHistoryUni></PaymentHistoryUni>,
      },
    ],
  },
  {
    path: "/add-new-service",
    element: (
      <AdminRoute>
        <AddNewService></AddNewService>
      </AdminRoute>
    ),
  },
  // {
  //   path: "/book-service/:serviceId",
  //   element: <BookService></BookService>,
  // },

  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);
export default router;
