import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['candidate', 'recruiter'], required: true },
  // Candidate fields
  resume: { type: String },
  skills: [{ type: String }],
  bio: { type: String },
  // Recruiter fields
  company: { type: String },
  companyLogo: { type: String }
}, { timestamps: true });

// Hash password BEFORE saving — runs automatically on every save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to check password at login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);