import Setting from '../models/Setting.js';

// @desc    Get system settings & SEO
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    // Seed defaults to avoid null references in client side
    if (!settings) {
      settings = await Setting.create({
        seo: {
          title: "Christopher Felix | Full Stack Developer Portfolio",
          description: "Enterprise-grade portfolio showcasing MERN, MEAN, React, and GraphQL/Hasura solutions.",
          keywords: ["Full Stack Developer", "MERN Stack", "MEAN Stack", "GraphQL", "Hasura", "Christopher Felix"],
          ogImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
        },
        socialLinks: {
          github: "https://github.com/felix-christopher",
          linkedin: "https://linkedin.com/in/felix-christopher",
          twitter: "https://twitter.com",
          phone: "+91 98765 43210",
          email: "christopher.felix@example.com",
        },
      });
    }

    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update system settings & SEO
// @route   PUT /api/settings
// @access  Private
export const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();

    if (settings) {
      settings = await Setting.findByIdAndUpdate(settings._id, req.body, { new: true });
    } else {
      settings = await Setting.create(req.body);
    }

    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
