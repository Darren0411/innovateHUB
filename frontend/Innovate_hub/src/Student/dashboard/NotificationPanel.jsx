"use client"
import { Bell, MessageSquare, Star, Heart, Eye, X } from "lucide-react"

const NotificationPanel = ({ notifications, onClose, onMarkAsRead }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end sm:items-start p-4">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Bell className="mr-2" size={20} />
            Notifications
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No notifications yet</div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${notification.read ? "bg-white" : "bg-blue-50"} transition-all duration-300 hover:shadow-md`}
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
                      <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        {!notification.read && (
                          <button
                            onClick={() => onMarkAsRead(notification.id)}
                            className="text-xs text-blue-600 hover:text-blue-800"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationPanel

