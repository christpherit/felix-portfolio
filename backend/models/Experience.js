import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    duration: { type: String, required: true },
    responsibilities: [{ type: String, required: true }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Experience = mongoose.model('Experience', ExperienceSchema);
export default Experience;
