import express from 'express';
import { protect, requireRole } from '../middleware/auth.js';
import { getJobs, getJobById, createJob, updateJob, deleteJob, getMyJobs } from '../controllers/jobController.js';

const router = express.Router();
router.get('/', getJobs);
router.get('/recruiter/my-jobs', protect, requireRole('recruiter'), getMyJobs);
router.get('/:id', getJobById);
router.post('/', protect, requireRole('recruiter'), createJob);
router.put('/:id', protect, requireRole('recruiter'), updateJob);
router.delete('/:id', protect, requireRole('recruiter'), deleteJob);
export default router;