"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Bell,
  Search,
  Filter,
  FileText,
  BarChart3,
  GitlabIcon as GitHub,
  Heart,
  Eye,
} from "lucide-react"
import axios from "axios"
import StudentNavbar from "../StudendNavbar"
import ProjectCard from "../dashboard/ProjectCard"
import NotificationPanel from "../dashboard/NotificationPanel"

const StudentDashboard = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalViews: 0,
    totalLikes: 0,
    averageRating: 0,
  })
  const [user, setUser] = useState({ name: "" })

  useEffect(() => {
    // Fetch all data when component mounts
    const fetchData = async () => {
      try {
        // Fetch user profile and projects in parallel
        const [profileResponse, projectsResponse] = await Promise.all([
          axios.get("http://localhost:9000/student/profile", { withCredentials: true }),
          axios.get("http://localhost:9000/student/projects", { withCredentials: true })
        ])

        // Set user data
        setUser({
          name: profileResponse.data.name || "Student",
          email: profileResponse.data.email,
          id: profileResponse.data.id
        })

        // Set projects data
        const projectsData = projectsResponse.data.map(project => ({
          id: project._id,
          title: project.title,
          description: project.description,
          image: project.imageUrl || "/placeholder.svg",
          status: project.status || "Pending",
          sdgs: project.sdgMapping || [],
          rating: project.averageRating || 0,
          comments: project.commentsCount || 0,
          views: project.views || 0,
          likes: project.likes || 0,
          github: project.githubRepoUrl || null,
          createdAt: project.createdAt
        }))

        setProjects(projectsData)
        setFilteredProjects(projectsData)

        // Calculate stats
        const totalProjects = projectsData.length
        const totalViews = projectsData.reduce((sum, project) => sum + project.views, 0)
        const totalLikes = projectsData.reduce((sum, project) => sum + project.likes, 0)
        const totalRatings = projectsData.reduce((sum, project) => sum + project.rating, 0)
        const averageRating = totalProjects > 0 ? totalRatings / totalProjects : 0

        setStats({
          totalProjects,
          totalViews,
          totalLikes,
          averageRating: averageRating.toFixed(1)
        })

        // Fetch notifications (mock data for now)
        const notificationsResponse = await axios.get("http://localhost:9000/student/notifications", { 
          withCredentials: true 
        }).catch(() => {
          // Fallback to mock data if endpoint doesn't exist
          return {
            data: [
              {
                id: 1,
                type: "comment",
                title: "New Comment",
                message: "Professor commented on your project.",
                time: "2 hours ago",
                read: false,
              }
            ]
          }
        })

        setNotifications(notificationsResponse.data)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter projects when status filter changes
  useEffect(() => {
    if (statusFilter === "") {
      setFilteredProjects(projects)
    } else {
      const filtered = projects.filter(project => project.status === statusFilter)
      setFilteredProjects(filtered)
    }
  }, [statusFilter, projects])

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value)
  }

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.patch(
        `http://localhost:9000/student/notifications/${notificationId}/read`,
        {},
        { withCredentials: true }
      )
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      )
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length
  const pendingProjectsCount = projects.filter(p => p.status === "Pending").length
  const approvedProjectsCount = projects.filter(p => p.status === "Approved").length

  return (
    <div className="min-h-screen bg-[#FFF2F2]">
      <StudentNavbar />

      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your projects and track your portfolio performance
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={() => setShowNotifications(true)}
              className="relative bg-white p-2 rounded-lg shadow-[3px_3px_6px_#e6d6d6,-3px_-3px_6px_#ffffff] hover:shadow-inner transition-all duration-300 ease-in-out"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            <a
              href="/student/uploadProject"
              className="bg-[#A9B5DF] text-white px-4 py-2 rounded-lg shadow-[3px_3px_6px_#8a9bc4,-3px_-3px_6px_#c8d3fa] hover:shadow-inner transition-all duration-300 ease-in-out flex items-center"
            >
              <Plus size={20} className="mr-2" />
              New Project
            </a>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FileText size={24} />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Projects</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-green-600">{approvedProjectsCount} Approved</span>
                  <span className="text-xs text-amber-600">{pendingProjectsCount} Pending</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <BarChart3 size={24} />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Views</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <Heart size={24} />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Total Likes</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLikes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <GitHub size={24} />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Avg. Rating</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">My Projects</h2>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <div className="sm:w-40 relative">
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9B5DF] appearance-none bg-white"
                value={statusFilter}
                onChange={handleStatusFilterChange}
              >
                <option value="">All Status</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-t-xl"></div>
                  <div className="bg-white p-5 rounded-b-xl">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-8 w-24 bg-gray-200 rounded"></div>
                      <div className="h-8 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No projects found with the selected filter.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <NotificationPanel
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onMarkAsRead={handleMarkAsRead}
        />
      )}
    </div>
  )
}

export default StudentDashboard