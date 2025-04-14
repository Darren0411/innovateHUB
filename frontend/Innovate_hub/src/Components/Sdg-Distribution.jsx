import { FaGlobe } from "react-icons/fa"

const SDGDistribution = ({ sdgData }) => {
  // Find the maximum value to calculate percentages
  const maxValue = Math.max(...sdgData.map((item) => item.count))

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">SDG Distribution</h3>
        <FaGlobe className="text-[#A9B5DF]" />
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {sdgData.map((sdg) => (
            <div key={sdg.id} className="flex items-center">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold mr-4"
                style={{ backgroundColor: sdg.color }}
              >
                {sdg.id}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-800">{sdg.name}</span>
                  <span className="text-sm text-gray-600">{sdg.count} projects</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${(sdg.count / maxValue) * 100}%`,
                      backgroundColor: sdg.color,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <a
            href="/admin/sdg-tracking"
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            View detailed SDG report
          </a>
        </div>
      </div>
    </div>
  )
}

export default SDGDistribution
