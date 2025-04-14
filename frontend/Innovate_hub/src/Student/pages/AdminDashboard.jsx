import React, { useState, useEffect } from 'react';
import { Edit, Lock, Trash, Mail, Eye } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../Components/Admin-Navbar';
// import Modal from '../../Components/Modal'; // Assume you have a Modal component

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageContent, setMessageContent] = useState('');
  const navigate = useNavigate();
  
  // Filter states
  const [activeTab, setActiveTab] = useState('All Users');
  const tabs = ['All Users', 'Students', 'Faculty', 'Viewers'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:9000/admin/dashboard',
          { withCredentials: true }
        );
        
        // Group projects by creator to count projects per user
        const usersMap = new Map();
        
        response.data.forEach(project => {
          const creator = project.creator || {};
          const userId = creator._id || 'unknown';
          
          if (!usersMap.has(userId)) {
            usersMap.set(userId, {
              _id: userId,
              name: creator.name || 'Unknown User',
              email: creator.email || 'no-email@example.com',
              role: creator.role === 'student' ? 'Student' : 'Faculty',
              status: 'Active',
              projects: 0,
              lastLogin: 'Recently',
              avatar: creator.ProfileUrl || '/api/placeholder/40/40',
              rollNo: creator.rollNo || 'N/A'
            });
          }
          
          const user = usersMap.get(userId);
          user.projects += 1;
        });
        
        setUsers(Array.from(usersMap.values()));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:9000/admin/users/${userId}`, {
          withCredentials: true
        });
        setUsers(users.filter(user => user._id !== userId));
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user');
      }
    }
  };

  const handleSendMessage = (user) => {
    setSelectedUser(user);
    setShowMessageModal(true);
  };

  const submitMessage = async () => {
    try {
      await axios.post('http://localhost:9000/admin/messages', {
        userId: selectedUser._id,
        content: messageContent
      }, {
        withCredentials: true
      });
      alert('Message sent successfully');
      setShowMessageModal(false);
      setMessageContent('');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message');
    }
  };

  const viewPortfolio = (userId) => {
    navigate(`/portfolio/${userId}`);
  };

  if (loading) {
    return (
      <div className="bg-[#FFF2F2] min-h-screen">
        <AdminNavbar />
        <div className="pt-20 p-6">
          <div className="flex justify-center items-center h-64">
            <p>Loading user data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#FFF2F2] min-h-screen">
        <AdminNavbar />
        <div className="pt-20 p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error: </strong> {error}
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF2F2] min-h-screen">
      <AdminNavbar />
      <div className="pt-20 p-6">
        {/* Main Content Area */}
        <div>
          {/* Header with title and buttons */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
            <div className="flex gap-3">
             
            </div>
          </div>

          {/* User type tabs */}
          <div className="bg-white rounded-t-lg border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === tab 
                      ? 'text-blue-600 border-b-2 border-blue-500' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full border border-gray-300 rounded pl-10 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-64">
              <div className="relative">
                <select className="w-full border border-gray-300 rounded py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Roles</option>
                  <option>Student</option>
                  <option>Faculty</option>
                  <option>Viewer</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-64">
              <div className="relative">
                <select className="w-full border border-gray-300 rounded py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-b-lg shadow">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">USER</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ROLE</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">PROJECTS</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">LAST LOGIN</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td 
                      className="px-6 py-4 cursor-pointer hover:underline"
                      onClick={() => viewPortfolio(user._id)}
                    >
                      <div className="flex items-center">
                        <img 
                          src={user.avatar.startsWith('/uploads') 
                            ? `http://localhost:9000${user.avatar}`
                            : user.avatar
                          } 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full object-cover" 
                          onError={(e) => {
                            e.target.src = '/api/placeholder/40/40';
                          }}
                        />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 ${
                          user.role === 'Student' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                        }`}>
                          {user.role === 'Student' ? '👨‍🎓' : '👩‍🏫'}
                        </span>
                        <span>{user.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {user.projects}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button 
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => viewPortfolio(user._id)}
                          title="View Portfolio"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          className="text-green-500 hover:text-green-700"
                          onClick={() => handleSendMessage(user)}
                          title="Send Message"
                        >
                          <Mail size={18} />
                        </button>
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteUser(user._id)}
                          title="Delete User"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <Modal onClose={() => setShowMessageModal(false)}>
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              Send message to {selectedUser?.name}
            </h3>
            <textarea
              className="w-full border border-gray-300 rounded p-3 mb-4"
              rows="5"
              placeholder="Type your message here..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded"
                onClick={() => setShowMessageModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={submitMessage}
              >
                Send
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;