import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverLetter: { type: String },
  resumeUrl: { type: String },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
    default: 'pending'
  }
}, { timestamps: true });

// Prevent duplicate applications
applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });

export default mongoose.model('Application', applicationSchema);