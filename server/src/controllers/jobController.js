import Job from '../models/Job.js';

export async function getJobs(req, res) {
  try {
    const { search, location, type, page = 1, limit = 10 } = req.query;
    const filter = { isActive: true };
    if (search) filter.$text = { $search: search };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (type) filter.type = type;

    const jobs = await Job.find(filter)
      .populate('postedBy', 'name company companyLogo')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Job.countDocuments(filter);
    res.json({ jobs, totalPages: Math.ceil(total / limit), currentPage: page, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getJobById(req, res) {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name company bio');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createJob(req, res) {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user._id, company: req.user.company || req.body.company });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateJob(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteJob(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await job.deleteOne();
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getMyJobs(req, res) {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}