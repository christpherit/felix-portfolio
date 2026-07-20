import About from '../models/About.js';

// @desc    Get about info
// @route   GET /api/about
// @access  Public
export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    
    // Seed default if empty to prevent frontend crashes
    if (!about) {
      about = await About.create({
        bio: "Christopher Felix is an enterprise Full Stack Developer with nearly 3 years of experience specializing in React, Angular, Node.js, GraphQL, Hasura, and MERN/MEAN architectures.",
        location: "Bangalore, India",
        profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
        stats: {
          experience: "Nearly 3 Years",
          projects: 14,
          technologies: 24,
          clients: 6,
        }
      });
    }

    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update about info
// @route   PUT /api/about
// @access  Private
export const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (about) {
      about = await About.findByIdAndUpdate(about._id, req.body, { new: true });
    } else {
      about = await About.create(req.body);
    }

    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
