import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Frontend', 'Backend', 'Database', 'Tools'],
    },
    level: { type: Number, required: true, min: 0, max: 100 },
    icon: { type: String, required: true },
  },
  { timestamps: true }
);

const Skill = mongoose.model('Skill', SkillSchema);
export default Skill;
