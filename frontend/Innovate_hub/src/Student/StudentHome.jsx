"use client"

import { useState, useEffect } from "react"
import {
  FaArrowRight,
  FaStar,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPlus,
  FaEdit,
  FaChartLine,
  FaComments,
  FaAward,
} from "react-icons/fa"
import StudentNavbar from "./StudendNavbar"

const StudentHome = () => {
  // State for projects and dashboard data
  const [myProjects, setMyProjects] = useState([])
  const [recentFeedback, setRecentFeedback] = useState([])
  const [sdgStats, setSdgStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    totalViews: 0,
    averageRating: 0,
  })

  // Fetch data from backend when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with actual API calls when backend is ready
        // For demo, we'll use mock data

        // Mock projects data
        const mockProjects = [
          {
            id: 1,
            title: "Eco-Friendly Smart Home System",
            description:
              "A sustainable smart home system that reduces energy consumption and promotes eco-friendly living.",
            type: "IoT Project",
            sdg: "Affordable and Clean Energy",
            sdgNumber: 7,
            status: "In Progress",
            rating: 4.5,
            views: 245,
            image: "https://cdn.pixabay.com/photo/2017/11/03/18/26/smarthome-2915165_1280.png",
            lastUpdated: "2 days ago",
          },
          {
            id: 2,
            title: "Community Water Purification",
            description: "Low-cost water purification system for communities with limited access to clean water.",
            type: "Hardware Project",
            sdg: "Clean Water and Sanitation",
            sdgNumber: 6,
            status: "Completed",
            rating: 4.8,
            views: 312,
            image: "https://cdn.pixabay.com/photo/2016/12/30/03/45/water-1940116_1280.jpg",
            lastUpdated: "1 week ago",
          },
          {
            id: 3,
            title: "Educational AR Application",
            description: "Augmented reality application for interactive learning experiences in STEM subjects.",
            type: "Mobile App",
            sdg: "Quality Education",
            sdgNumber: 4,
            status: "Draft",
            rating: 3.9,
            views: 120,
            image: "https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg",
            lastUpdated: "3 days ago",
          },
        ]

        // Mock feedback data
        const mockFeedback = [
          {
            id: 1,
            project: "Eco-Friendly Smart Home System",
            from: "Prof. Johnson",
            message:
              "Great progress on your energy monitoring module. Consider adding a predictive algorithm for energy usage patterns.",
            date: "Yesterday",
            avatar: "https://randomuser.me/api/portraits/men/41.jpg",
          },
          {
            id: 2,
            project: "Community Water Purification",
            from: "Industry Mentor - Sarah Chen",
            message:
              "Your filtration design is innovative! I'd recommend testing with a wider range of contaminants to ensure effectiveness.",
            date: "3 days ago",
            avatar: "https://randomuser.me/api/portraits/women/33.jpg",
          },
          {
            id: 3,
            project: "Educational AR Application",
            from: "Peer Review - Michael Kim",
            message:
              "The UI is intuitive, but the AR markers could be more responsive. Let's discuss optimization techniques.",
            date: "1 week ago",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
          },
        ]

        // Mock SDG stats data
        const mockSdgStats = [
          { sdg: 4, name: "Quality Education", count: 1, color: "#C5192D" },
          { sdg: 6, name: "Clean Water and Sanitation", count: 1, color: "#26BDE2" },
          { sdg: 7, name: "Affordable and Clean Energy", count: 1, color: "#FCC30B" },
          { sdg: 11, name: "Sustainable Cities", count: 1, color: "#FD9D24" },
          { sdg: 13, name: "Climate Action", count: 1, color: "#3F7E44" },
        ]

        // Mock dashboard stats
        const mockStats = {
          totalProjects: 3,
          completedProjects: 1,
          totalViews: 677,
          averageRating: 4.4,
        }

        setMyProjects(mockProjects)
        setRecentFeedback(mockFeedback)
        setSdgStats(mockSdgStats)
        setStats(mockStats)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-[#FFF2F2]">
      <StudentNavbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-b from-[#A9B5DF] to-[#FFF2F2] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-white"></div>
          <div className="absolute bottom-20 left-1/4 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute bottom-40 right-1/3 w-24 h-24 rounded-full bg-white"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Welcome to Your Creative Coding Hub</h1>
              <p className="text-xl mb-8 text-gray-700">
                Manage your projects, track feedback, and showcase your innovations that contribute to the Sustainable
                Development Goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/projects/new"
                  className="bg-[#A9B5DF] hover:bg-[#8a96c0] text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg flex items-center"
                >
                  <FaPlus className="mr-2" /> Create New Project
                </a>
                <a
                  href="/dashboard"
                  className="bg-white hover:bg-gray-100 text-[#A9B5DF] font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg border border-[#A9B5DF]"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#A9B5DF] rounded-lg opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#A9B5DF] rounded-lg opacity-20"></div>
                <img
                  src="https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg"
                  alt="Student Projects"
                  className="rounded-lg shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FFF2F2] rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-[#A9B5DF] text-white mr-4">
                  <FaEdit size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Projects</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalProjects}</h3>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF2F2] rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-[#A9B5DF] text-white mr-4">
                  <FaAward size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Completed</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.completedProjects}</h3>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF2F2] rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-[#A9B5DF] text-white mr-4">
                  <FaChartLine size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Views</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.totalViews}</h3>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF2F2] rounded-xl p-6 shadow-md">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-[#A9B5DF] text-white mr-4">
                  <FaStar size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Avg. Rating</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stats.averageRating.toFixed(1)}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Projects Section */}
      <section className="py-16 bg-[#FFF2F2]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">My Projects</h2>
            <a href="/projects" className="text-[#A9B5DF] hover:underline flex items-center">
              View All <FaArrowRight className="ml-2" />
            </a>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="rounded-full h-16 w-16 border-t-4 border-b-4 border-[#A9B5DF] animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {myProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-[#A9B5DF] text-white px-3 py-1 m-2 rounded-lg text-sm font-medium">
                      {project.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{project.type}</span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{project.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs text-gray-500">
                        SDG {project.sdgNumber}: {project.sdg}
                      </span>
                      <span className="text-xs text-gray-500">{project.views} views</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Updated {project.lastUpdated}</span>
                      <a
                        href={`/projects/${project.id}`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center transition duration-300 text-sm"
                      >
                        Edit Project
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Project Card */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-dashed border-gray-300 flex flex-col items-center justify-center h-full min-h-[400px] transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#A9B5DF] rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <FaPlus size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Create New Project</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Start a new project and contribute to the Sustainable Development Goals
                  </p>
                  <a
                    href="/projects/new"
                    className="bg-[#A9B5DF] hover:bg-[#8a96c0] text-white py-2 px-6 rounded-lg inline-block transition duration-300"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recent Feedback & SDG Impact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Feedback */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recent Feedback</h2>
                <a href="/feedback" className="text-[#A9B5DF] hover:underline flex items-center text-sm">
                  View All <FaArrowRight className="ml-2" />
                </a>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="rounded-full h-12 w-12 border-t-4 border-b-4 border-[#A9B5DF] animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentFeedback.map((feedback) => (
                    <div key={feedback.id} className="bg-[#FFF2F2] rounded-xl p-4 shadow-md">
                      <div className="flex items-start">
                        <img
                          src={feedback.avatar || "/placeholder.svg"}
                          alt={feedback.from}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-gray-800">{feedback.from}</h4>
                              <p className="text-sm text-gray-500">on {feedback.project}</p>
                            </div>
                            <span className="text-xs text-gray-500">{feedback.date}</span>
                          </div>
                          <p className="mt-2 text-gray-700">{feedback.message}</p>
                          <div className="mt-3 flex justify-end">
                            <button className="text-[#A9B5DF] hover:underline text-sm flex items-center">
                              <FaComments className="mr-1" /> Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SDG Impact */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your SDG Impact</h2>
                <a href="/sdg-impact" className="text-[#A9B5DF] hover:underline flex items-center text-sm">
                  Learn More <FaArrowRight className="ml-2" />
                </a>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="rounded-full h-12 w-12 border-t-4 border-b-4 border-[#A9B5DF] animate-spin"></div>
                </div>
              ) : (
                <div className="bg-[#FFF2F2] rounded-xl p-6 shadow-md">
                  <p className="text-gray-700 mb-6">
                    Your projects are contributing to the following Sustainable Development Goals:
                  </p>

                  <div className="space-y-4">
                    {sdgStats.map((sdg) => (
                      <div key={sdg.sdg} className="flex items-center">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold mr-4"
                          style={{ backgroundColor: sdg.color }}
                        >
                          {sdg.sdg}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-800">{sdg.name}</span>
                            <span className="text-sm text-gray-600">
                              {sdg.count} project{sdg.count !== 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full"
                              style={{
                                width: `${(sdg.count / 3) * 100}%`,
                                backgroundColor: sdg.color,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <a
                      href="/sdg-mapping"
                      className="bg-[#A9B5DF] hover:bg-[#8a96c0] text-white py-2 px-6 rounded-lg inline-block transition duration-300"
                    >
                      Map More Projects to SDGs
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Deadlines & Opportunities */}
      <section className="py-16 bg-[#FFF2F2]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Upcoming Deadlines & Opportunities</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-2 bg-red-500"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Project Submission</h3>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full">3 days left</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Final submission deadline for the Sustainable Innovation Challenge. Make sure your project
                  documentation is complete.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Due: April 10, 2025</span>
                  <a
                    href="/projects"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center transition duration-300 text-sm"
                  >
                    Review Projects
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-2 bg-green-500"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Mentorship Session</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">Upcoming</span>
                </div>
                <p className="text-gray-600 mb-4">
                  Group mentorship session with industry experts. Prepare questions about your project implementation.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">April 15, 2025 • 2:00 PM</span>
                  <a
                    href="/mentorship"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center transition duration-300 text-sm"
                  >
                    Join Session
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-2 bg-blue-500"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Hackathon</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Registration Open</span>
                </div>
                <p className="text-gray-600 mb-4">
                  SDG Innovation Hackathon - Build solutions addressing climate action in a 48-hour collaborative event.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">April 22-24, 2025</span>
                  <a
                    href="/events/hackathon"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center transition duration-300 text-sm"
                  >
                    Register Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources & Learning */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Resources & Learning</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FFF2F2] rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-[#A9B5DF] rounded-lg flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">SDG Documentation</h3>
              <p className="text-sm text-gray-600 mb-4">
                Comprehensive guides on mapping your projects to Sustainable Development Goals.
              </p>
              <a href="/resources/sdg-docs" className="text-[#A9B5DF] hover:underline text-sm flex items-center">
                View Documentation <FaArrowRight className="ml-2" />
              </a>
            </div>

            <div className="bg-[#FFF2F2] rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-[#A9B5DF] rounded-lg flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Tutorial Videos</h3>
              <p className="text-sm text-gray-600 mb-4">
                Step-by-step video tutorials on project development and presentation techniques.
              </p>
              <a href="/resources/tutorials" className="text-[#A9B5DF] hover:underline text-sm flex items-center">
                Watch Tutorials <FaArrowRight className="ml-2" />
              </a>
            </div>

            <div className="bg-[#FFF2F2] rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-[#A9B5DF] rounded-lg flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Community Forum</h3>
              <p className="text-sm text-gray-600 mb-4">
                Connect with other students, share ideas, and get help with your projects.
              </p>
              <a href="/community" className="text-[#A9B5DF] hover:underline text-sm flex items-center">
                Join Discussion <FaArrowRight className="ml-2" />
              </a>
            </div>

            <div className="bg-[#FFF2F2] rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-[#A9B5DF] rounded-lg flex items-center justify-center text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Project Templates</h3>
              <p className="text-sm text-gray-600 mb-4">
                Ready-to-use templates and boilerplates to jumpstart your creative coding projects.
              </p>
              <a href="/resources/templates" className="text-[#A9B5DF] hover:underline text-sm flex items-center">
                Browse Templates <FaArrowRight className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Connect with Mentors */}
      <section className="py-16 bg-[#FFF2F2]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Connect with Mentors</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Get guidance from industry professionals and faculty mentors who can help you refine your projects and align
            them with real-world impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Dr. Emily Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800">Dr. Emily Chen</h3>
                <p className="text-sm text-gray-600 mb-3">AI & Machine Learning Specialist</p>
                <p className="text-sm text-gray-700 mb-4">
                  Expert in applying AI solutions to environmental challenges. Can help with SDGs 13, 14, and 15.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2">AI</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">ML</span>
                  </div>
                  <a
                    href="/mentors/emily-chen"
                    className="bg-[#A9B5DF] hover:bg-[#8a96c0] text-white py-2 px-4 rounded-lg flex items-center justify-center transition duration-300 text-sm"
                  >
                    Schedule Meeting
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Prof. James Wilson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800">Prof. James Wilson</h3>
                <p className="text-sm text-gray-600 mb-3">Sustainable Engineering Faculty</p>
                <p className="text-sm text-gray-700 mb-4">
                  Specializes in renewable energy and sustainable infrastructure projects. Expert in SDGs 7, 9, and 11.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2">Energy</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Engineering</span>
                  </div>
                  <a
                    href="/mentors/james-wilson"
                    className="bg-[#A9B5DF] hover:bg-[#8a96c0] text-white py-2 px-4 rounded-lg flex items-center justify-center transition duration-300 text-sm"
                  >
                    Schedule Meeting
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Maria Rodriguez"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-800">Maria Rodriguez</h3>
                <p className="text-sm text-gray-600 mb-3">UX/UI Design Lead</p>
                <p className="text-sm text-gray-700 mb-4">
                  Expert in creating accessible and inclusive digital experiences. Can help with SDGs 4, 5, and 10.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full mr-2">UX/UI</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Design</span>
                  </div>
                  <a
                    href="/mentors/maria-rodriguez"
                    className="bg-[#A9B5DF] hover:bg-[#8a96c0] text-white py-2 px-4 rounded-lg flex items-center justify-center transition duration-300 text-sm"
                  >
                    Schedule Meeting
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="/mentors"
              className="bg-white hover:bg-gray-100 text-[#A9B5DF] font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg border border-[#A9B5DF]"
            >
              View All Mentors
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Creative Coding Platform</h3>
              <p className="text-gray-400">
                Empowering students to showcase their creative coding projects and connect with industry professionals.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/dashboard" className="text-gray-400 hover:text-white transition duration-300">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="/projects" className="text-gray-400 hover:text-white transition duration-300">
                    My Projects
                  </a>
                </li>
                <li>
                  <a href="/portfolio" className="text-gray-400 hover:text-white transition duration-300">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="/leaderboard" className="text-gray-400 hover:text-white transition duration-300">
                    Leaderboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/resources/sdg-docs" className="text-gray-400 hover:text-white transition duration-300">
                    SDG Documentation
                  </a>
                </li>
                <li>
                  <a href="/resources/tutorials" className="text-gray-400 hover:text-white transition duration-300">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="/community" className="text-gray-400 hover:text-white transition duration-300">
                    Community Forum
                  </a>
                </li>
                <li>
                  <a href="/help" className="text-gray-400 hover:text-white transition duration-300">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <FaGithub size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <FaInstagram size={20} />
                </a>
              </div>
              <p className="text-gray-400">Email: contact@creativecoding.edu</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Creative Coding Showcase Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default StudentHome

