import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    required: true
  },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  salary: { min: Number, max: Number, currency: { type: String, default: 'INR' } },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   // Reference to User document
    required: true
  },
  isActive: { type: Boolean, default: true },
  applicantCount: { type: Number, default: 0 }
}, { timestamps: true });

// Text index enables full-text search
jobSchema.index({ title: 'text', description: 'text', company: 'text' });

export default mongoose.model('Job', jobSchema);