import { body, param } from 'express-validator';
import mongoose from 'mongoose';

// Validation for applying to a job
export const validateApplication = [
  body('jobId')
    .notEmpty().withMessage('Job ID is required')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid job ID format'),
  
  body('coverLetter')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Cover letter cannot exceed 2000 characters')
    .escape(),
  
  body('resumeUrl')
    .optional()
    .trim()
    .isURL({ protocols: ['http', 'https'] }).withMessage('Invalid resume URL')
    .matches(/\.(pdf|doc|docx)$/i).withMessage('Resume must be PDF, DOC, or DOCX format')
];

// Validation for updating application status
export const validateStatusUpdate = [
  param('id')
    .notEmpty().withMessage('Application ID is required')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid application ID format'),
  
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'])
    .withMessage('Invalid application status')
];

// Validation for job ID parameter in getting applications
export const validateJobApplications = [
  param('jobId')
    .notEmpty().withMessage('Job ID is required')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid job ID format')
];