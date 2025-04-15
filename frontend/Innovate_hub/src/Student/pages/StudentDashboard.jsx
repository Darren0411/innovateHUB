import { useState, useEffect } from "react";
import {
  Plus,
  Bell,
  Search,
  Filter,
  FileText,
  BarChart3,
  GitlabIcon as GitHub,
  Heart,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import axios from "axios";
import StudentNavbar from "../StudendNavbar";
import ProjectCard from "../dashboard/ProjectCard";

const StudentDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalViews: 0,
    totalLikes: 0,
    averageRating: 0,
  });
  const [user, setUser] = useState({ name: "" });

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes, feedbackRes] = await Promise.all([
          axios.get("http://localhost:9000/student/profile", { withCredentials: true }),
          axios.get("http://localhost:9000/student/projects", { withCredentials: true }),
          axios.get("http://localhost:9000/student/feedback", { withCredentials: true }),
        ]);

        const userData = profileRes.data;
        setUser({
          name: userData.name || "Student",
          email: userData.email,
          id: userData.id,
        });

        const projectsData = projectsRes.data.projects.map((project) => {
          const sdgBadges = project.sdgMapping?.map(sdg => 
            sdg.split(' ').slice(0, 3).join(' ')
          ) || [];
        
          return {
            id: project._id,
            title: project.title,
            description: project.readMe?.substring(0, 100) + '...' || "No description",
            image: project.projectImage
              ? `http://localhost:9000/${project.projectImage.replace(/\\/g, "/")}`
              : "/placeholder.svg",
            status: project.status || "Pending",
            sdgs: sdgBadges,
            rating: project.averageRating || 0,
            comments: project.feedback?.length || 0,
            views: project.views || 0,
            likes: project.likes || 0,
            github: project.githubRepoUrl || null,
            techStack: project.techStack || [],
            category: project.category || "Uncategorized",
            createdAt: project.createdAt,
          };
        });

        setProjects(projectsData);
        setFilteredProjects(projectsData);

        // Stats Calculation
        const totalProjects = projectsData.length;
        const totalViews = projectsData.reduce((sum, p) => sum + p.views, 0);
        const totalLikes = projectsData.reduce((sum, p) => sum + p.likes, 0);
        const totalRatings = projectsData.reduce((sum, p) => sum + p.rating, 0);
        const averageRating = totalProjects ? (totalRatings / totalProjects).toFixed(1) : 0;

        setStats({
          totalProjects,
          totalViews,
          totalLikes,
          averageRating,
        });

        // Process feedback notifications
        const feedbackNotifications = feedbackRes.data.map(feedback => ({
          id: feedback._id,
          type: "feedback",
          title: "Project Feedback",
          message: feedback.message,
          projectTitle: feedback.project?.title || "Your project",
          senderName: feedback.sender?.name || "Admin",
          status: feedback.project?.status || "Pending",
          time: formatTimeAgo(feedback.createdAt),
          read: feedback.read || false,
        }));

        setNotifications(feedbackNotifications);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setNotifications([{
          id: 1,
          type: "system",
          title: "Welcome",
          message: "You have no notifications yet",
          time: "Just now",
          read: true,
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (statusFilter === "") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.status === statusFilter));
    }
  }, [statusFilter, projects]);

  const handleStatusFilterChange = (e) => setStatusFilter(e.target.value);

  const handleMarkAsRead = async (feedbackId) => {
    try {
      await axios.patch(
        `http://localhost:9000/student/feedback/${feedbackId}/read`,
        {},
        { withCredentials: true }
      );
      setNotifications(prev => prev.map(n => 
        n.id === feedbackId ? { ...n, read: true } : n
      ));
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const pendingProjects = projects.filter(p => p.status === "Pending").length;
  const approvedProjects = projects.filter(p => p.status === "Approved").length;

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 className="text-green-500" size={16} />;
      case "Rejected":
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-amber-500" size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF2F2]">
      <StudentNavbar />
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your projects and track your portfolio performance</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button
              onClick={() => setShowNotifications(true)}
              className="relative bg-white p-2 rounded-lg shadow hover:shadow-inner transition"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            <a
              href="/student/uploadProject"
              className="bg-[#A9B5DF] text-white px-4 py-2 rounded-lg shadow hover:shadow-inner transition flex items-center"
            >
              <Plus size={20} className="mr-2" />
              New Project
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<FileText />} title="Total Projects" value={stats.totalProjects}>
            <span className="text-xs text-green-600">{approvedProjects} Approved</span>
            <span className="text-xs text-amber-600 ml-2">{pendingProjects} Pending</span>
          </StatCard>
          <StatCard icon={<BarChart3 />} title="Total Views" value={stats.totalViews} />
          <StatCard icon={<Heart />} title="Total Likes" value={stats.totalLikes} />
          <StatCard icon={<GitHub />} title="Avg. Rating" value={stats.averageRating} />
        </div>

        {/* Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9B5DF]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="sm:w-40 relative">
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9B5DF] bg-white"
            >
              <option value="">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <ProjectCard project={project} key={project.id} showEditButton={true} />
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">No projects found.</div>
            )}
          </div>
        )}
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Notifications</h2>
              <button onClick={() => setShowNotifications(false)} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No notifications</p>
            ) : (
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        {getStatusIcon(notification.status)}
                        <h3 className="font-medium ml-2">{notification.title}</h3>
                      </div>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    {notification.projectTitle && (
                      <p className="text-sm font-medium mt-1">Project: {notification.projectTitle}</p>
                    )}
                    {notification.senderName && (
                      <p className="text-sm mt-1">From: {notification.senderName}</p>
                    )}
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        notification.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        notification.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {notification.status}
                      </span>
                    </div>
                    <p className="text-sm mt-2">{notification.message}</p>
                    {!notification.read && (
                      <button 
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable stat card
const StatCard = ({ icon, title, value, children }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-gray-100 text-gray-600">
        {icon}
      </div>
      <div className="ml-4">
        <h2 className="text-sm font-medium text-gray-500">{title}</h2>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {children && <div className="mt-1">{children}</div>}
      </div>
    </div>
  </div>
);

// Skeleton loader for project cards
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((i) => (
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
);

export default StudentDashboard;