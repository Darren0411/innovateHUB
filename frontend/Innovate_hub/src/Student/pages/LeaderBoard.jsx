"use client"

import { useState, useEffect } from "react"
import { Search, ArrowUp, ArrowDown, Minus } from "lucide-react"
import StudentNavbar from "../StudendNavbar"

const Leaderboard = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Fetch leaderboard data
    const fetchData = async () => {
      try {
        // Mock data for demo
        const mockProjects = [
          {
            id: 101,
            title: "Renewable Energy Grid",
            team: "Team Voltage",
            teamMembers: ["Alex Johnson", "Maria Garcia", "David Kim"],
            image: "/placeholder.svg?height=80&width=80",
            score: 95,
            change: 2,
            sdgs: [7, 9, 11],
            views: 1245,
            likes: 342,
            isOwnProject: false,
          },
          {
            id: 102,
            title: "Ocean Plastic Recycler",
            team: "Blue Planet",
            teamMembers: ["Sarah Chen", "Michael Brown", "Emma Wilson"],
            image: "/placeholder.svg?height=80&width=80",
            score: 92,
            change: 0,
            sdgs: [14, 12, 9],
            views: 1120,
            likes: 298,
            isOwnProject: false,
          },
          {
            id: 2, // One of our projects
            title: "Community Water Purification",
            team: "Team Innovators",
            teamMembers: ["John Doe", "Jane Smith", "Robert Johnson"],
            image: "/placeholder.svg?height=80&width=80",
            score: 89,
            change: 3,
            sdgs: [3, 6, 10],
            views: 980,
            likes: 276,
            isOwnProject: true,
          },
          {
            id: 103,
            title: "Urban Farming Solution",
            team: "Green Thumbs",
            teamMembers: ["Lisa Park", "Thomas White", "Olivia Martinez"],
            image: "/placeholder.svg?height=80&width=80",
            score: 85,
            change: -1,
            sdgs: [2, 11, 13],
            views: 865,
            likes: 231,
            isOwnProject: false,
          },
          {
            id: 1, // One of our projects
            title: "Eco-Friendly Smart Home System",
            team: "Team Innovators",
            teamMembers: ["John Doe", "Jane Smith", "Robert Johnson"],
            image: "/placeholder.svg?height=80&width=80",
            score: 82,
            change: 1,
            sdgs: [7, 11, 13],
            views: 820,
            likes: 215,
            isOwnProject: true,
          },
          {
            id: 104,
            title: "Sustainable Fashion Marketplace",
            team: "EcoStyle",
            teamMembers: ["Hannah Lee", "James Wilson", "Sophia Rodriguez"],
            image: "/placeholder.svg?height=80&width=80",
            score: 78,
            change: 4,
            sdgs: [12, 8, 5],
            views: 756,
            likes: 198,
            isOwnProject: false,
          },
          {
            id: 105,
            title: "Biodegradable Packaging",
            team: "GreenWrap",
            teamMembers: ["Daniel Taylor", "Ava Johnson", "Noah Martin"],
            image: "/placeholder.svg?height=80&width=80",
            score: 75,
            change: -2,
            sdgs: [12, 14, 15],
            views: 712,
            likes: 187,
            isOwnProject: false,
          },
          {
            id: 3, // One of our projects
            title: "Educational AR Application",
            team: "Team Innovators",
            teamMembers: ["John Doe", "Jane Smith", "Robert Johnson"],
            image: "/placeholder.svg?height=80&width=80",
            score: 68,
            change: 5,
            sdgs: [4, 9],
            views: 645,
            likes: 172,
            isOwnProject: true,
          },
          {
            id: 106,
            title: "Clean Energy Monitoring",
            team: "PowerWatch",
            teamMembers: ["Ryan Clark", "Isabella Moore", "Ethan Baker"],
            image: "/placeholder.svg?height=80&width=80",
            score: 65,
            change: 0,
            sdgs: [7, 13],
            views: 590,
            likes: 154,
            isOwnProject: false,
          },
          {
            id: 107,
            title: "Healthcare Access Platform",
            team: "MediConnect",
            teamMembers: ["Grace Williams", "Lucas Thompson", "Zoe Anderson"],
            image: "/placeholder.svg?height=80&width=80",
            score: 62,
            change: -3,
            sdgs: [3, 10],
            views: 540,
            likes: 142,
            isOwnProject: false,
          },
        ]

        setProjects(mockProjects)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching leaderboard data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter projects based on selected filter and search query
  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "my-projects" && project.isOwnProject) ||
      (filter === "top-10" && projects.indexOf(project) < 10)

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.teamMembers.some((member) => member.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#FFF2F2]">
      <StudentNavbar />

      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Project Leaderboard</h1>
            <p className="mt-1 text-sm text-gray-500">See how your projects rank compared to others</p>
          </div>
        </div>

        {/* Top 3 Projects */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Top Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 h-64 rounded-lg"></div>
                    </div>
                  ))
              : projects.slice(0, 3).map((project, index) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] overflow-hidden relative"
                  >
                    <div
                      className={`absolute top-0 left-0 w-full h-2 ${
                        index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                      }`}
                    ></div>

                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div
                          className={`
                        w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold mr-4
                        ${index === 0 ? "bg-yellow-100 text-yellow-800" : ""}
                        ${index === 1 ? "bg-gray-100 text-gray-800" : ""}
                        ${index === 2 ? "bg-orange-100 text-orange-800" : ""}
                      `}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{project.title}</h3>
                          <p className="text-gray-600">{project.team}</p>
                        </div>
                        <div className="ml-auto">
                          <div className="text-2xl font-bold text-gray-900">{project.score}</div>
                          <div className="flex items-center justify-end">
                            {project.change > 0 && (
                              <div className="flex items-center text-green-600 text-sm">
                                <ArrowUp size={14} className="mr-1" />
                                <span>{project.change}</span>
                              </div>
                            )}
                            {project.change < 0 && (
                              <div className="flex items-center text-red-600 text-sm">
                                <ArrowDown size={14} className="mr-1" />
                                <span>{Math.abs(project.change)}</span>
                              </div>
                            )}
                            {project.change === 0 && (
                              <div className="flex items-center text-gray-500 text-sm">
                                <Minus size={14} className="mr-1" />
                                <span>0</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.sdgs.map((sdg) => (
                          <span
                            key={sdg}
                            className="bg-[#FFF2F2] text-gray-700 px-2 py-1 rounded-md text-xs font-medium shadow-[2px_2px_4px_#e6d6d6,-2px_-2px_4px_#ffffff]"
                          >
                            SDG {sdg}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between text-sm text-gray-500">
                        <div>{project.views} views</div>
                        <div>{project.likes} likes</div>
                      </div>

                      {project.isOwnProject && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                            Your Project
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Full Leaderboard</h2>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="Search projects or teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
              >
                <option value="all">All Projects</option>
                <option value="my-projects">My Projects</option>
                <option value="top-10">Top 10</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SDGs</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array(10)
                      .fill(0)
                      .map((_, index) => (
                        <tr key={index} className="animate-pulse">
                          <td className="py-4 whitespace-nowrap">
                            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                          </td>
                          <td className="py-4">
                            <div className="h-8 bg-gray-200 rounded w-40"></div>
                          </td>
                          <td className="py-4">
                            <div className="h-6 bg-gray-200 rounded w-24"></div>
                          </td>
                          <td className="py-4">
                            <div className="h-6 bg-gray-200 rounded w-32"></div>
                          </td>
                          <td className="py-4">
                            <div className="h-6 bg-gray-200 rounded w-12"></div>
                          </td>
                          <td className="py-4">
                            <div className="h-6 bg-gray-200 rounded w-8"></div>
                          </td>
                          <td className="py-4">
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                          </td>
                        </tr>
                      ))
                  : filteredProjects.map((project, index) => (
                      <tr key={project.id} className={`hover:bg-gray-50 ${project.isOwnProject ? "bg-blue-50" : ""}`}>
                        <td className="py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span
                              className={`
                            w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium
                            ${index === 0 ? "bg-yellow-100 text-yellow-800" : ""}
                            ${index === 1 ? "bg-gray-100 text-gray-800" : ""}
                            ${index === 2 ? "bg-orange-100 text-orange-800" : ""}
                            ${index > 2 ? "bg-blue-50 text-blue-800" : ""}
                          `}
                            >
                              {index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <img
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              className="w-10 h-10 rounded-md object-cover mr-3"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{project.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{project.team}</div>
                        </td>
                        <td className="py-4">
                          <div className="flex flex-wrap gap-1">
                            {project.sdgs.map((sdg) => (
                              <span
                                key={sdg}
                                className="bg-[#FFF2F2] text-gray-700 px-2 py-0.5 rounded-md text-xs font-medium"
                              >
                                {sdg}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{project.score}</div>
                        </td>
                        <td className="py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {project.change > 0 && (
                              <div className="flex items-center text-green-600">
                                <ArrowUp size={16} className="mr-1" />
                                <span className="text-sm">{project.change}</span>
                              </div>
                            )}
                            {project.change < 0 && (
                              <div className="flex items-center text-red-600">
                                <ArrowDown size={16} className="mr-1" />
                                <span className="text-sm">{Math.abs(project.change)}</span>
                              </div>
                            )}
                            {project.change === 0 && (
                              <div className="flex items-center text-gray-500">
                                <Minus size={16} className="mr-1" />
                                <span className="text-sm">0</span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {project.views} views · {project.likes} likes
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {filteredProjects.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">No projects found matching your criteria</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard

