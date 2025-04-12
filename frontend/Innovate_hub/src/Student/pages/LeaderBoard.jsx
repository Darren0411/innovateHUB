"use client"

import { useState, useEffect } from "react"
import { Search, ArrowUp, ArrowDown, Minus, User } from "lucide-react"
import StudentNavbar from "../StudendNavbar"
import axios from "axios"

const Leaderboard = () => {
  const [topProjects, setTopProjects] = useState([])
  const [topStudents, setTopStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await axios.get("http://localhost:9000/leaderboard")
        
        if (!response.data || !response.data.success) {
          throw new Error(response.data?.message || "Failed to fetch leaderboard data")
        }

        // Process projects - calculate score if not already calculated
        const processedProjects = response.data.projects.map(project => ({
          ...project,
          score: project.score || (project.rating || 0) * 0.5 + (project.likes || 0) * 0.3 + (project.views || 0) * 0.2,
          change: project.change || 0
        })).sort((a, b) => b.score - a.score)

        // Process students - aggregate their project stats
        const studentStats = {}
        processedProjects.forEach(project => {
          if (project.creator) {
            if (!studentStats[project.creator]) {
              const creator = response.data.users.find(u => u._id === project.creator) || {}
              studentStats[project.creator] = {
                ...creator,
                totalScore: 0,
                totalLikes: 0,
                totalViews: 0,
                projectCount: 0
              }
            }
            studentStats[project.creator].totalScore += project.score
            studentStats[project.creator].totalLikes += project.likes || 0
            studentStats[project.creator].totalViews += project.views || 0
            studentStats[project.creator].projectCount += 1
          }
        })

        // Convert to array and sort by total score
        const processedStudents = Object.values(studentStats)
          .sort((a, b) => b.totalScore - a.totalScore)
          .slice(0, 15) // Top 15 students

        setTopProjects(processedProjects.slice(0, 3)) // Only keep top 3 projects
        setTopStudents(processedStudents)
      } catch (error) {
        console.error("Error fetching leaderboard data:", error)
        setError(error.message || "Failed to load leaderboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFF2F2]">
        <StudentNavbar />
        <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF2F2]">
      <StudentNavbar />

      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
            <p className="mt-1 text-sm text-gray-500">Top performers based on project engagement</p>
          </div>
        </div>

        {/* Top 3 Projects */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Top Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg"></div>
                </div>
              ))
            ) : topProjects.length > 0 ? (
              topProjects.map((project, index) => {
                const creator = topStudents.find(s => s._id === project.creator) || {}
                return (
                  <div
                    key={project._id}
                    className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] overflow-hidden relative"
                  >
                    <div className={`absolute top-0 left-0 w-full h-2 ${
                      index === 0 ? "bg-yellow-500" : 
                      index === 1 ? "bg-gray-400" : "bg-orange-500"
                    }`}></div>

                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold mr-4 ${
                          index === 0 ? "bg-yellow-100 text-yellow-800" : 
                          index === 1 ? "bg-gray-100 text-gray-800" : "bg-orange-100 text-orange-800"
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{project.title}</h3>
                          <p className="text-gray-600">{project.team || "Individual Project"}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.sdgMapping?.map((sdg, i) => (
                          <span key={i} className="bg-[#FFF2F2] text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                            {sdg.split(' ').slice(0, 3).join(' ')}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between text-sm text-gray-500 mb-4">
                        <div>{project.views || 0} views</div>
                        <div>{project.likes || 0} likes</div>
                        <div>Score: {project.score?.toFixed(1) || "N/A"}</div>
                      </div>

                      <div className="flex items-center">
                        <div className="relative mr-3">
                          <img
                            src={creator.ProfileUrl ? `http://localhost:9000${creator.ProfileUrl}` : "/default-avatar.png"}
                            alt={creator.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#A9B5DF]"
                            onError={(e) => {
                              e.target.src = "/default-avatar.png"
                            }}
                          />
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                            <User className="h-3 w-3 text-[#A9B5DF]" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {creator.name || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">Creator</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">
                No projects found
              </div>
            )}
          </div>
        </div>

        {/* Top Students */}
        <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Top Students</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Score</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Likes</th>
                  <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Views</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array(5).fill(0).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="py-4"><div className="h-6 w-6 bg-gray-200 rounded-full"></div></td>
                      <td className="py-4"><div className="h-8 bg-gray-200 rounded w-32"></div></td>
                      <td className="py-4"><div className="h-6 bg-gray-200 rounded w-12"></div></td>
                      <td className="py-4"><div className="h-6 bg-gray-200 rounded w-16"></div></td>
                      <td className="py-4"><div className="h-6 bg-gray-200 rounded w-16"></div></td>
                      <td className="py-4"><div className="h-6 bg-gray-200 rounded w-16"></div></td>
                    </tr>
                  ))
                ) : topStudents.length > 0 ? (
                  topStudents.map((student, index) => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="py-4">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                          index === 0 ? "bg-yellow-100 text-yellow-800" : 
                          index === 1 ? "bg-gray-100 text-gray-800" : 
                          index === 2 ? "bg-orange-100 text-orange-800" : "bg-blue-50 text-blue-800"
                        }`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <img
                            src={student.ProfileUrl ? `http://localhost:9000${student.ProfileUrl}` : "/default-avatar.png"}
                            alt={student.name}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                            onError={(e) => {
                              e.target.src = "/default-avatar.png"
                            }}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-xs text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-900">{student.projectCount}</td>
                      <td className="py-4 text-sm font-medium text-gray-900">
                        {student.totalScore.toFixed(1)}
                      </td>
                      <td className="py-4 text-sm text-gray-900">{student.totalLikes}</td>
                      <td className="py-4 text-sm text-gray-900">{student.totalViews}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard