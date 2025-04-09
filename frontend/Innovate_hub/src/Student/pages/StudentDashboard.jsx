"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Bell,
  Search,
  Filter,
  BarChart3,
  FileText,
  GitlabIcon as GitHub,
  Award,
  MessageSquare,
  Star,
  Heart,
  Eye,
} from "lucide-react"
import StudentNavbar from "../StudendNavbar"
import ProjectCard from "../dashboard/ProjectCard"
import NotificationPanel from "../dashboard/NotificationPanel"
import LeaderboardWidget from "../dashboard/Leaderboardwidget"

const StudentDashboard = () => {
  const [projects, setProjects] = useState([])
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    totalViews: 0,
    averageRating: 0,
  })
  const [leaderboardProjects, setLeaderboardProjects] = useState([])

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        // In a real app, these would be actual API calls
        // For demo, we'll use mock data

        // Mock projects data
        const mockProjects = [
          {
            id: 1,
            title: "Eco-Friendly Smart Home System",
            description:
              "A sustainable smart home system that reduces energy consumption and promotes eco-friendly living.",
            image: "/placeholder.svg?height=200&width=300",
            status: "In Progress",
            sdgs: [7, 11, 13],
            rating: 4.5,
            comments: 12,
            views: 245,
            likes: 56,
            github: "https://github.com/username/eco-smart-home",
          },
          {
            id: 2,
            title: "Community Water Purification",
            description: "Low-cost water purification system for communities with limited access to clean water.",
            image: "/placeholder.svg?height=200&width=300",
            status: "Completed",
            sdgs: [3, 6, 10],
            rating: 4.8,
            comments: 24,
            views: 312,
            likes: 89,
            github: "https://github.com/username/water-purification",
          },
          {
            id: 3,
            title: "Educational AR Application",
            description: "Augmented reality application for interactive learning experiences in STEM subjects.",
            image: "/placeholder.svg?height=200&width=300",
            status: "Draft",
            sdgs: [4, 9],
            rating: 3.9,
            comments: 5,
            views: 120,
            likes: 32,
            github: null,
          },
        ]

        // Mock notifications data
        const mockNotifications = [
          {
            id: 1,
            type: "comment",
            title: "New Comment",
            message: "Professor Smith commented on your Eco-Friendly Smart Home System project.",
            time: "2 hours ago",
            read: false,
          },
          {
            id: 2,
            type: "rating",
            title: "New Rating",
            message: "Your Community Water Purification project received a 5-star rating!",
            time: "1 day ago",
            read: true,
          },
          {
            id: 3,
            type: "like",
            title: "Project Liked",
            message: "Industry expert Jane Doe liked your Educational AR Application.",
            time: "3 days ago",
            read: false,
          },
          {
            id: 4,
            type: "view",
            title: "Milestone Reached",
            message: "Your Eco-Friendly Smart Home System project has reached 200 views!",
            time: "1 week ago",
            read: true,
          },
        ]

        // Mock stats data
        const mockStats = {
          totalProjects: 3,
          completedProjects: 1,
          totalViews: 677,
          averageRating: 4.4,
        }

        // Mock leaderboard data
        const mockLeaderboard = [
          {
            id: 101,
            title: "Renewable Energy Grid",
            team: "Team Voltage",
            image: "/placeholder.svg?height=40&width=40",
            score: 95,
            change: 2,
          },
          {
            id: 102,
            title: "Ocean Plastic Recycler",
            team: "Blue Planet",
            image: "/placeholder.svg?height=40&width=40",
            score: 92,
            change: 0,
          },
          {
            id: 2, // One of our projects
            title: "Community Water Purification",
            team: "Team Innovators",
            image: "/placeholder.svg?height=40&width=40",
            score: 89,
            change: 3,
          },
          {
            id: 103,
            title: "Urban Farming Solution",
            team: "Green Thumbs",
            image: "/placeholder.svg?height=40&width=40",
            score: 85,
            change: -1,
          },
          {
            id: 1, // One of our projects
            title: "Eco-Friendly Smart Home System",
            team: "Team Innovators",
            image: "/placeholder.svg?height=40&width=40",
            score: 82,
            change: 1,
          },
        ]

        setProjects(mockProjects)
        setNotifications(mockNotifications)
        setStats(mockStats)
        setLeaderboardProjects(mockLeaderboard)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-[#FFF2F2]">
      <StudentNavbar />

      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your projects, track feedback, and showcase your portfolio
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
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Award size={24} />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Completed</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.completedProjects}</p>
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
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <GitHub size={24} />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500">Avg. Rating</h2>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">My Projects</h2>
                <a href="/projects" className="text-[#A9B5DF] hover:underline text-sm">
                  View All
                </a>
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
                <div className="sm:w-40">
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9B5DF] appearance-none bg-white">
                    <option value="">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="published">Published</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <Filter size={18} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map((i) => (
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Leaderboard Widget */}
            <LeaderboardWidget projects={leaderboardProjects} />

            {/* Recent Notifications */}
            <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Notifications</h3>
                <button onClick={() => setShowNotifications(true)} className="text-[#A9B5DF] hover:underline text-sm">
                  View All
                </button>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex items-start">
                      <div className="h-8 w-8 bg-gray-200 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${notification.read ? "bg-white" : "bg-blue-50"}`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          {notification.type === "comment" && <MessageSquare className="text-blue-500" size={20} />}
                          {notification.type === "rating" && <Star className="text-yellow-500" size={20} />}
                          {notification.type === "like" && <Heart className="text-red-500" size={20} />}
                          {notification.type === "view" && <Eye className="text-green-500" size={20} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="/portfolio"
                  className="flex flex-col items-center p-4 bg-[#FFF2F2] rounded-lg hover:shadow-inner transition-all duration-300"
                >
                  <FileText size={24} className="text-[#A9B5DF] mb-2" />
                  <span className="text-sm font-medium text-gray-700">Portfolio</span>
                </a>
                <a
                  href="/github"
                  className="flex flex-col items-center p-4 bg-[#FFF2F2] rounded-lg hover:shadow-inner transition-all duration-300"
                >
                  <GitHub size={24} className="text-[#A9B5DF] mb-2" />
                  <span className="text-sm font-medium text-gray-700">GitHub</span>
                </a>
                <a
                  href="/leaderboard"
                  className="flex flex-col items-center p-4 bg-[#FFF2F2] rounded-lg hover:shadow-inner transition-all duration-300"
                >
                  <BarChart3 size={24} className="text-[#A9B5DF] mb-2" />
                  <span className="text-sm font-medium text-gray-700">Leaderboard</span>
                </a>
                <a
                  href="/achievements"
                  className="flex flex-col items-center p-4 bg-[#FFF2F2] rounded-lg hover:shadow-inner transition-all duration-300"
                >
                  <Award size={24} className="text-[#A9B5DF] mb-2" />
                  <span className="text-sm font-medium text-gray-700">Achievements</span>
                </a>
              </div>
            </div>
          </div>
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

