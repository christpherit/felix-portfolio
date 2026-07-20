import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema(
  {
    bio: { type: String, required: true },
    location: { type: String, required: true },
    profileImage: { type: String, required: true },
    resumeUrl: { type: String, default: '#' },
    stats: {
      experience: { type: String, default: 'Nearly 3 Years' },
      projects: { type: Number, default: 0 },
      technologies: { type: Number, default: 0 },
      clients: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const About = mongoose.model('About', AboutSchema);
export default About;
