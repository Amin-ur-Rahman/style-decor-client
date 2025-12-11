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
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    photo: "https://i.pravatar.cc/150?img=12",
    role: "Admin", // Admin, User, Decorator
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // All menu items (will be filtered by role later)
  const menuItems = {
    user: [
      { icon: HiHome, label: "Dashboard", path: "/dashboard" },
      { icon: HiUser, label: "My Profile", path: "/dashboard/profile" },
      { icon: HiCalendar, label: "My Bookings", path: "/dashboard/bookings" },
      {
        icon: HiCreditCard,
        label: "Payment History",
        path: "/dashboard/payments",
      },
    ],
    admin: [
      { icon: HiHome, label: "Dashboard", path: "/dashboard/admin" },
      {
        icon: HiUserGroup,
        label: "Manage Decorators",
        path: "/dashboard/admin/decorators",
      },
      {
        icon: HiCollection,
        label: "Manage Services",
        path: "/dashboard/admin/services",
      },
      {
        icon: HiClipboardList,
        label: "Manage Bookings",
        path: "/dashboard/admin/bookings",
      },
      {
        icon: HiChartBar,
        label: "Analytics",
        path: "/dashboard/admin/analytics",
      },
      { icon: HiCash, label: "Revenue", path: "/dashboard/admin/revenue" },
    ],
    decorator: [
      { icon: HiHome, label: "Dashboard", path: "/dashboard/decorator" },
      {
        icon: HiClipboardList,
        label: "My Projects",
        path: "/dashboard/decorator/projects",
      },
      {
        icon: HiCalendar,
        label: "Today's Schedule",
        path: "/dashboard/decorator/schedule",
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
    common: [{ icon: HiCog, label: "Settings", path: "/dashboard/settings" }],
  };

  // Combine all menu items (unconditionally for now)
  const allMenuItems = [
    { category: "User Menu", items: menuItems.user },
    { category: "Admin Menu", items: menuItems.admin },
    { category: "Decorator Menu", items: menuItems.decorator },
    { category: "Settings", items: menuItems.common },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-neutral sticky top-0 z-40 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Menu Button & Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors lg:hidden"
              >
                <HiMenu className="w-6 h-6 text-primary" />
              </button>

              {/* Desktop Sidebar Toggle */}
              <button
                onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}
                className="hidden lg:block p-2 rounded-lg hover:bg-secondary transition-colors"
                title="Toggle Sidebar"
              >
                <HiViewBoards className="w-6 h-6 text-primary" />
              </button>

              <a href="/" className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <HiSparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-primary hidden sm:block">
                  StyleDecor
                </span>
              </a>
            </div>

            {/* Center: Search Bar */}
            {/* <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-secondary border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                />
              </div>
            </div> */}

            {/* Right: Notifications & Profile */}
            <div className="flex items-center gap-4">
              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
                title="Toggle Fullscreen"
              >
                <HiArrowsExpand className="w-6 h-6 text-gray-600" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <HiBell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-neutral">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <img
                  src={user.photo}
                  alt={user.name}
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
          className={`hidden lg:block bg-white border-r border-neutral min-h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300 ${
            isDesktopSidebarOpen ? "w-64" : "w-0 overflow-hidden"
          }`}
        >
          <div className="p-4 w-64">
            <nav className="space-y-6">
              {allMenuItems.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                    {section.category}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <a
                          href={item.path}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-secondary hover:text-primary rounded-lg transition-all group"
                        >
                          <item.icon className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Logout Button */}
              <div className="pt-4 border-t border-neutral">
                <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all">
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
          className={`fixed top-0 left-0 z-50 w-72 h-full bg-white transform transition-transform duration-300 lg:hidden ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            {/* Mobile Sidebar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <HiSparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-primary">
                  StyleDecor
                </span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <HiX className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg mb-6">
              <img
                src={user.photo}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-accent"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
                <p className="text-xs text-accent font-medium mt-0.5">
                  {user.role}
                </p>
              </div>
            </div>

            {/* Mobile Menu */}
            <nav className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto">
              {allMenuItems.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
                    {section.category}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <a
                          href={item.path}
                          onClick={() => setIsSidebarOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-secondary hover:text-primary rounded-lg transition-all group"
                        >
                          <item.icon className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Logout Button */}
              <div className="pt-4 border-t border-neutral">
                <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <HiLogout className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <Outlet></Outlet>
      </div>
    </div>
  );
}
