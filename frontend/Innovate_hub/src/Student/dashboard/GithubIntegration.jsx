"use client"

import { useState } from "react"
import { GitlabIcon as GitHub, Link2, Check, AlertCircle } from "lucide-react"

const GitHubIntegration = ({ projectId, currentRepo, onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [error, setError] = useState(null)
  const [selectedRepo, setSelectedRepo] = useState(currentRepo || null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsConnecting(true)
    setError(null)

    try {
      // Mock API call - replace with actual GitHub API integration
      setTimeout(() => {
        const mockResults = [
          { id: 1, name: "project-management", description: "A project management application", stars: 12, forks: 5 },
          {
            id: 2,
            name: "student-portfolio",
            description: "Portfolio website template for students",
            stars: 45,
            forks: 23,
          },
          { id: 3, name: searchQuery, description: "Repository matching your search", stars: 8, forks: 2 },
        ]
        setSearchResults(mockResults)
        setIsConnecting(false)
      }, 1000)
    } catch (err) {
      setError("Failed to search repositories. Please try again.")
      setIsConnecting(false)
    }
  }

  const handleSelectRepo = (repo) => {
    setSelectedRepo(repo)
    onConnect(repo)
  }

  return (
    <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6">
      <div className="flex items-center mb-6">
        <GitHub size={24} className="mr-3 text-gray-700" />
        <h3 className="text-xl font-bold text-gray-800">GitHub Integration</h3>
      </div>

      {selectedRepo ? (
        <div className="mb-6">
          <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <Check size={20} className="mr-3 text-green-600" />
              <div>
                <h4 className="font-medium text-gray-800">{selectedRepo.name}</h4>
                <p className="text-sm text-gray-600">{selectedRepo.description}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedRepo(null)}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Change
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            Connect your project to a GitHub repository to sync your code and track changes.
          </p>

          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your repositories..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
              />
              <button
                type="submit"
                disabled={isConnecting}
                className="bg-[#A9B5DF] text-white px-4 py-2 rounded-r-lg shadow-[3px_3px_6px_#8a9bc4,-3px_-3px_6px_#c8d3fa] hover:shadow-inner transition-all duration-300 ease-in-out"
              >
                {isConnecting ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          {error && (
            <div className="flex items-center p-4 mb-6 border border-red-200 bg-red-50 rounded-lg">
              <AlertCircle size={20} className="mr-3 text-red-600" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-800">Search Results</h4>
              {searchResults.map((repo) => (
                <div
                  key={repo.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSelectRepo(repo)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium text-gray-800">{repo.name}</h5>
                      <p className="text-sm text-gray-600 mt-1">{repo.description}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      ⭐ {repo.stars} 🍴 {repo.forks}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-800 mb-4">Manual Connection</h4>
        <div className="flex">
          <input
            type="text"
            placeholder="https://github.com/username/repo"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
          />
          <button className="bg-[#A9B5DF] text-white px-4 py-2 rounded-r-lg shadow-[3px_3px_6px_#8a9bc4,-3px_-3px_6px_#c8d3fa] hover:shadow-inner transition-all duration-300 ease-in-out flex items-center">
            <Link2 size={16} className="mr-2" />
            Connect
          </button>
        </div>
      </div>
    </div>
  )
}

export default GitHubIntegration

