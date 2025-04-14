const StatsCard = ({ title, value, icon, color }) => {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-5">
          <div className="flex items-center">
            <div
              className={`flex-shrink-0 rounded-full p-3 mr-4`}
              style={{ backgroundColor: `${color}20`, color: color }}
            >
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default StatsCard
  