import Project from '../models/project.js';
import User from '../models/user.js';


 async function handlePendingProjects (req, res) {
    try {
        const pendingProjects = await Project.find({ status: 'Pending' }).populate('creator')
      res.json(pendingProjects);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching pending projects.' });
    }
  };

  export default handlePendingProjects;

