import { useState } from "react";
import {
  HiMenu,
  HiX,
  HiHome,
  HiUser,
  HiCalendar,
  HiCreditCard,
  HiUserGroup,
  HiSparkles,
  HiCog,
  HiChartBar,
  HiCollection,
  HiClipboardList,
  HiCash,
  HiLogout,
  HiBell,
  HiSearch,
  HiViewBoards,
  HiArrowsExpand,
} from "react-icons/hi";
import { FaHistory } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks and contexts/auth/useAuth";
import Logo from "../../components/Logo";
import { LoadingBubbles } from "../../LoadingAnimations";
import useUserInfo from "../../hooks and contexts/role/useUserInfo";
import { ImHistory } from "react-icons/im";
import ThemeToggle from "../../ThemeToggle";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { userData, infoLoading } = useUserInfo();
  const { logout } = useAuth();
  const { user, authLoading } = useAuth();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const menuItems = {
    user: [
      { icon: HiHome, label: "Dashboard", path: "/dashboard/user" },
      { icon: HiUser, label: "My Profile", path: "/dashboard/my-profile" },
      {
        icon: HiCreditCard,
        label: "Payment History",
        path: "/dashboard/payment-history",
      },
    ],
    admin: [
      { icon: HiHome, label: "Dashboard", path: "/dashboard/admin" },
      {
        icon: HiUserGroup,
        label: "Manage Decorators",
        path: "/dashboard/manage-decorators",
      },
      {
        icon: HiCollection,
        label: "Manage Services",
        path: "/dashboard/manage-services",
      },
      {
        icon: HiClipboardList,
        label: "Manage Bookings",
        path: "/dashboard/manage-bookings",
      },
      {
        icon: FaHistory,
        label: "Booking History",
        path: "/dashboard/booking-history",
      },
    ],
    decorator: [
      { icon: HiHome, label: "Dashboard", path: "/dashboard/decorator-home" },
      {
        icon: HiClipboardList,
        label: "Assigned Projects",
        path: "/dashboard/decorator/assigned-projects",
      },
      {
        icon: HiCash,
        label: "Earnings",
        path: "/dashboard/decorator/earnings",
      },
      {
        icon: HiUser,
        label: "My Profile",
        path: "/dashboard/decorator/profile",
      },
    ],
  };

  if (authLoading || infoLoading) return <LoadingBubbles />;

  const role = userData?.role;
  const activeMenu = menuItems[role] || [];

  return (
    <div className="min-h-screen bg-bg-main">
      {/* Top Navbar */}
      <nav className="bg-bg-alt border-b border-neutral sticky top-0 z-40 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Menu Button & Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-bg-main transition-colors lg:hidden"
              >
                <HiMenu className="w-6 h-6 text-primary" />
              </button>

              <button
                onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
                className="hidden lg:block p-2 rounded-lg hover:bg-bg-main transition-colors"
                title="Toggle Sidebar"
              >
                <HiViewBoards className="w-6 h-6 text-primary" />
              </button>

              <div className="mx-4 lg:mx-10 my-5">
                <Link to="/">
                  <Logo />
                </Link>
              </div>
            </div>

            {/* Right: Notifications & Profile */}
            <div className="flex items-center gap-4">
              <ThemeToggle></ThemeToggle>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg hover:bg-bg-main transition-colors"
                title="Toggle Fullscreen"
              >
                <HiArrowsExpand className="w-6 h-6 text-text-secondary" />
              </button>

              <button className="relative p-2 rounded-lg hover:bg-bg-main transition-colors">
                <HiBell className="w-6 h-6 text-text-secondary" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-neutral">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-semibold text-text-primary">
                    {user?.displayName}
                  </p>
                  <p className="text-xs text-text-muted capitalize">
                    {userData?.role}
                  </p>
                </div>
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-accent"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside
          className={`hidden lg:block bg-bg-alt border-r border-neutral min-h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 ${
            isDesktopSidebarOpen ? "w-64" : "w-0 overflow-hidden"
          }`}
        >
          <div className="p-4 w-64">
            <nav className="space-y-2">
              {activeMenu.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all group ${
                      isActive
                        ? "bg-bg-main text-primary shadow-sm"
                        : "text-text-secondary hover:bg-bg-main hover:text-primary"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                  {item.label}
                </NavLink>
              ))}

              {role !== "user" && (
                <NavLink
                  to="/dashboard/payment/history/admin/decorator"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all group ${
                      isActive
                        ? "bg-bg-main text-primary"
                        : "text-text-secondary hover:bg-bg-main hover:text-primary"
                    }`
                  }
                >
                  <ImHistory className="w-5 h-5 text-text-muted group-hover:text-primary" />
                  Payment History
                </NavLink>
              )}

              <div className="pt-4 border-t border-neutral">
                <button
                  onClick={logout}
                  className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <HiLogout className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-50 w-72 h-full bg-bg-alt transform transition-transform duration-300 lg:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <Logo />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-bg-main transition-colors"
              >
                <HiX className="w-6 h-6 text-text-secondary" />
              </button>
            </div>

            {/* Mobile User Info */}
            <div className="flex items-center gap-3 p-3 bg-bg-main rounded-lg mb-6">
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-accent"
              />
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  {user?.displayName}
                </p>
                <p className="text-xs text-text-muted">{user?.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {activeMenu.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? "bg-bg-main text-primary"
                        : "text-text-secondary hover:bg-bg-main"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 mt-4 border-t border-neutral pt-4"
              >
                <HiLogout className="w-5 h-5" />
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
