import { Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react"

const LeaderboardWidget = ({ projects }) => {
  return (
    <div className="bg-white rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Trophy size={24} className="mr-3 text-yellow-500" />
          <h3 className="text-xl font-bold text-gray-800">Project Leaderboard</h3>
        </div>
        <a href="/leaderboard" className="text-[#A9B5DF] hover:underline text-sm">
          View Full Leaderboard
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id} className="hover:bg-gray-50">
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
                      <div className="text-xs text-gray-500">{project.team}</div>
                    </div>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeaderboardWidget

