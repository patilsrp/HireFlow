import express from 'express';
import { protect, requireRole } from '../middleware/auth.js';
import { applyForJob, getMyApplications, getJobApplications, updateApplicationStatus } from '../controllers/applicationController.js';
import { handleValidationErrors } from '../middleware/validation.js';
import { validateApplication, validateStatusUpdate, validateJobApplications } from '../validators/applicationValidator.js';

const router = express.Router();
router.post('/', protect, requireRole('candidate'), validateApplication, handleValidationErrors, applyForJob);
router.get('/my', protect, requireRole('candidate'), getMyApplications);
router.get('/job/:jobId', protect, requireRole('recruiter'), validateJobApplications, handleValidationErrors, getJobApplications);
router.patch('/:id/status', protect, requireRole('recruiter'), validateStatusUpdate, handleValidationErrors, updateApplicationStatus);
export default router;