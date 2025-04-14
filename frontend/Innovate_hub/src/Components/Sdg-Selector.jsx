"use client"

import { useState } from "react"

const sdgOptions = [
  { id: 1, name: "No Poverty", color: "#E5243B" },
  { id: 2, name: "Zero Hunger", color: "#DDA63A" },
  { id: 3, name: "Good Health and Well-being", color: "#4C9F38" },
  { id: 4, name: "Quality Education", color: "#C5192D" },
  { id: 5, name: "Gender Equality", color: "#FF3A21" },
  { id: 6, name: "Clean Water and Sanitation", color: "#26BDE2" },
  { id: 7, name: "Affordable and Clean Energy", color: "#FCC30B" },
  { id: 8, name: "Decent Work and Economic Growth", color: "#A21942" },
  { id: 9, name: "Industry, Innovation and Infrastructure", color: "#FD6925" },
  { id: 10, name: "Reduced Inequalities", color: "#DD1367" },
  { id: 11, name: "Sustainable Cities and Communities", color: "#FD9D24" },
  { id: 12, name: "Responsible Consumption and Production", color: "#BF8B2E" },
  { id: 13, name: "Climate Action", color: "#3F7E44" },
  { id: 14, name: "Life Below Water", color: "#0A97D9" },
  { id: 15, name: "Life on Land", color: "#56C02B" },
  { id: 16, name: "Peace, Justice and Strong Institutions", color: "#00689D" },
  { id: 17, name: "Partnerships for the Goals", color: "#19486A" },
]

const SDGSelector = ({ selectedSDGs, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleSDG = (sdgId) => {
    if (selectedSDGs.includes(sdgId)) {
      onChange(selectedSDGs.filter((id) => id !== sdgId))
    } else {
      onChange([...selectedSDGs, sdgId])
    }
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Map to Sustainable Development Goals (SDGs)
      </label>

      <div
        className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-lg bg-white min-h-[80px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedSDGs.length > 0 ? (
          selectedSDGs.map((sdgId) => {
            const sdg = sdgOptions.find((s) => s.id === sdgId)
            return (
              <div
                key={sdgId}
                className="flex items-center rounded-full px-3 py-1 text-white text-sm"
                style={{ backgroundColor: sdg.color }}
              >
                <span>
                  {sdg.id}. {sdg.name}
                </span>
                <button
                  className="ml-2 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleToggleSDG(sdgId)
                  }}
                >
                  &times;
                </button>
              </div>
            )
          })
        ) : (
          <div className="text-gray-500 text-sm">Select SDGs that your project contributes to...</div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {sdgOptions.map((sdg) => (
            <div
              key={sdg.id}
              className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer ${
                selectedSDGs.includes(sdg.id) ? "bg-gray-100" : ""
              }`}
              onClick={() => handleToggleSDG(sdg.id)}
            >
              <div className="w-6 h-6 rounded-full mr-3" style={{ backgroundColor: sdg.color }}></div>
              <div>
                <span className="font-medium">
                  {sdg.id}. {sdg.name}
                </span>
              </div>
              {selectedSDGs.includes(sdg.id) && <div className="ml-auto">✓</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SDGSelector
