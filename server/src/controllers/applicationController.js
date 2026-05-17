import Application from '../models/Application.js';
import Job from '../models/Job.js';

export async function applyForJob(req, res) {
  try {
    const { jobId, coverLetter } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const existing = await Application.findOne({ job: jobId, candidate: req.user._id });
    if (existing) return res.status(400).json({ message: 'Already applied' });

    const application = await Application.create({ job: jobId, candidate: req.user._id, coverLetter, resumeUrl: req.user.resume });
    await Job.findByIdAndUpdate(jobId, { $inc: { applicantCount: 1 } });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getMyApplications(req, res) {
  try {
    const applications = await Application.find({ candidate: req.user._id })
      .populate('job', 'title company location type')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getJobApplications(req, res) {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job || job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const applications = await Application.find({ job: req.params.jobId })
      .populate('candidate', 'name email skills bio resume')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateApplicationStatus(req, res) {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true })
      .populate('candidate', 'name email');
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}