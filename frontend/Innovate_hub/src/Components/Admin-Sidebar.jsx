import { Link, useLocation } from "react-router-dom"
import {
  FaUsers,
  FaProjectDiagram,
  FaChartBar,
  FaBell,
  FaFileAlt,
  FaGlobe,
  FaTachometerAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa"

const AdminSidebar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const menuItems = [
    { path: "/admin/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { path: "/admin/users", icon: <FaUsers />, label: "User Management" },
    { path: "/admin/projects", icon: <FaProjectDiagram />, label: "Project Moderation" },
    { path: "/admin/leaderboard", icon: <FaChartBar />, label: "Leaderboard" },
    { path: "/admin/notifications", icon: <FaBell />, label: "Notifications" },
    { path: "/admin/reports", icon: <FaFileAlt />, label: "Reports & Insights" },
    { path: "/admin/sdg-tracking", icon: <FaGlobe />, label: "SDG Tracking" },
    { path: "/admin/settings", icon: <FaCog />, label: "Settings" },
  ]

  return (
    <div className="hidden md:block w-64 bg-white shadow-lg h-screen fixed left-0 top-16 overflow-y-auto">
      <div className="py-4">
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-600">Manage your platform</p>
        </div>
        <div className="mt-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path} className="px-2 py-1">
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-[#A9B5DF] text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 py-2 mt-8 border-t border-gray-200">
          <Link
            to="/logout"
            className="flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar
