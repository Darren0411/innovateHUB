"use client"

import { useState } from "react"
import AdminNavbar from "../../Components/Admin-Navbar.jsx"
import AdminSidebar from "../../Components/Admin-Sidebar.jsx"
import AdminFooter from "../../Components/Admin-Footer.jsx"
import {
  FaSearch,
  FaFilter,
  FaUserGraduate,
  FaUserTie,
  FaUser,
  FaEdit,
  FaTrash,
  FaLock,
  FaUnlock,
  FaDownload,
  FaPlus,
} from "react-icons/fa"

const Users = () => {
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Mock user data
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      role: "student",
      status: "active",
      projects: 5,
      lastLogin: "2 hours ago",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Emma Johnson",
      email: "emma.j@example.com",
      role: "student",
      status: "active",
      projects: 3,
      lastLogin: "1 day ago",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Dr. Michael Chen",
      email: "m.chen@example.com",
      role: "faculty",
      status: "active",
      projects: 0,
      lastLogin: "3 days ago",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "s.williams@example.com",
      role: "student",
      status: "inactive",
      projects: 2,
      lastLogin: "2 weeks ago",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "Prof. Robert Johnson",
      email: "r.johnson@example.com",
      role: "faculty",
      status: "active",
      projects: 0,
      lastLogin: "5 hours ago",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "Lisa Brown",
      email: "lisa.brown@example.com",
      role: "viewer",
      status: "active",
      projects: 0,
      lastLogin: "1 hour ago",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
      id: 7,
      name: "David Wilson",
      email: "d.wilson@example.com",
      role: "student",
      status: "suspended",
      projects: 1,
      lastLogin: "1 month ago",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: 8,
      name: "Jennifer Lee",
      email: "j.lee@example.com",
      role: "viewer",
      status: "active",
      projects: 0,
      lastLogin: "2 days ago",
      avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    },
  ]

  // Filter users based on active tab, search term, role, and status
  const filteredUsers = users.filter((user) => {
    // Filter by tab
    if (activeTab !== "all" && user.role !== activeTab) {
      return false
    }

    // Filter by search term
    if (
      searchTerm &&
      !user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by role
    if (selectedRole !== "all" && user.role !== selectedRole) {
      return false
    }

    // Filter by status
    if (selectedStatus !== "all" && user.status !== selectedStatus) {
      return false
    }

    return true
  })

  // Get role icon
  const getRoleIcon = (role) => {
    switch (role) {
      case "student":
        return <FaUserGraduate className="text-blue-500" />
      case "faculty":
        return <FaUserTie className="text-purple-500" />
      case "viewer":
        return <FaUser className="text-green-500" />
      default:
        return <FaUser className="text-gray-500" />
    }
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Active
          </span>
        )
      case "inactive":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            Inactive
          </span>
        )
      case "suspended":
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            Suspended
          </span>
        )
      default:
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            Unknown
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF2F2] flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1 pt-16">
        <AdminSidebar />
        <main className="flex-1 ml-0 md:ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">User Management</h1>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#A9B5DF] hover:bg-[#8a96c0] focus:outline-none">
                  <FaPlus className="mr-2" /> Add User
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                  <FaDownload className="mr-2" /> Export Users
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white shadow rounded-lg mb-6">
              <div className="px-4 sm:px-6 border-b border-gray-200">
                <div className="flex overflow-x-auto">
                  <button
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === "all"
                        ? "border-[#A9B5DF] text-[#A9B5DF]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("all")}
                  >
                    All Users
                  </button>
                  <button
                    className={`ml-8 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === "student"
                        ? "border-[#A9B5DF] text-[#A9B5DF]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("student")}
                  >
                    Students
                  </button>
                  <button
                    className={`ml-8 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === "faculty"
                        ? "border-[#A9B5DF] text-[#A9B5DF]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("faculty")}
                  >
                    Faculty
                  </button>
                  <button
                    className={`ml-8 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                      activeTab === "viewer"
                        ? "border-[#A9B5DF] text-[#A9B5DF]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab("viewer")}
                  >
                    Viewers
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-[#A9B5DF] focus:border-[#A9B5DF] sm:text-sm"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaFilter className="text-gray-400" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-[#A9B5DF] focus:border-[#A9B5DF] sm:text-sm"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaFilter className="text-gray-400" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-[#A9B5DF] focus:border-[#A9B5DF] sm:text-sm"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Projects
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Last Login
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getRoleIcon(user.role)}
                            <span className="ml-2 text-sm text-gray-900 capitalize">{user.role}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(user.status)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.projects}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              <FaEdit />
                            </button>
                            {user.status === "suspended" ? (
                              <button className="text-green-600 hover:text-green-900">
                                <FaUnlock />
                              </button>
                            ) : (
                              <button className="text-yellow-600 hover:text-yellow-900">
                                <FaLock />
                              </button>
                            )}
                            <button className="text-red-600 hover:text-red-900">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredUsers.length === 0 && (
                <div className="px-6 py-10 text-center">
                  <p className="text-gray-500">No users found matching your criteria.</p>
                </div>
              )}
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
                  <span className="font-medium">{users.length}</span> users
                </div>
                <div className="flex-1 flex justify-end">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <AdminFooter />
    </div>
  )
}

export default Users
