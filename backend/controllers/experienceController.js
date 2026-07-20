import Experience from '../models/Experience.js';

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({}).sort({ order: 1 });
    res.json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create an experience
// @route   POST /api/experiences
// @access  Private
export const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update an experience
// @route   PUT /api/experiences/:id
// @access  Private
export const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found.' });
    }
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete an experience
// @route   DELETE /api/experiences/:id
// @access  Private
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found.' });
    }
    res.json({ success: true, message: 'Experience deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
