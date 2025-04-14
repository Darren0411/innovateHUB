import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa"

const AdminFooter = () => {
  return (
    <footer className="bg-white shadow-inner py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} InnovateHub Creative Coding Platform. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors">
              <FaLinkedin />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors">
              <FaGithub />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AdminFooter
