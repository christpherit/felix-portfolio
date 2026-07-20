import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    liveUrl: { type: String, required: true },
    githubUrl: { type: String, required: true },
    techStack: [{ type: String, required: true }],
    category: { type: String, required: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    
    // Case Study Documentation Fields
    overview: { type: String },
    businessProblem: { type: String },
    solution: { type: String },
    architectureDiagram: { type: String },
    databaseDesign: { type: String },
    apiFlow: { type: String },
    challengesFaced: { type: String },
    howSolved: { type: String },
    features: [{ type: String }],
    lessonsLearned: { type: String },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
