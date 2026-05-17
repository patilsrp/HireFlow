import express from 'express';
import { protect, requireRole } from '../middleware/auth.js';
import { getJobs, getJobById, createJob, updateJob, deleteJob, getMyJobs } from '../controllers/jobController.js';
import { handleValidationErrors } from '../middleware/validation.js';
import { validateJob, validateJobSearch, validateJobId } from '../validators/jobValidator.js';

const router = express.Router();
router.get('/', validateJobSearch, handleValidationErrors, getJobs);
router.get('/recruiter/my-jobs', protect, requireRole('recruiter'), getMyJobs);
router.get('/:id', validateJobId, handleValidationErrors, getJobById);
router.post('/', protect, requireRole('recruiter'), validateJob, handleValidationErrors, createJob);
router.put('/:id', protect, requireRole('recruiter'), validateJobId, validateJob, handleValidationErrors, updateJob);
router.delete('/:id', protect, requireRole('recruiter'), validateJobId, handleValidationErrors, deleteJob);
export default router;