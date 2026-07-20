import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema(
  {
    seo: {
      title: { type: String, default: 'Christopher Felix | Portfolio' },
      description: { type: String, default: 'Full Stack Developer Portfolio' },
      keywords: [{ type: String }],
      ogImage: { type: String, default: '' },
    },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

const Setting = mongoose.model('Setting', SettingSchema);
export default Setting;
