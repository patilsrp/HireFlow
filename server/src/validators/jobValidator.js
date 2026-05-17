import { body, query, param } from 'express-validator';
import mongoose from 'mongoose';

// Validation for creating/updating a job
export const validateJob = [
  body('title')
    .trim()
    .notEmpty().withMessage('Job title is required')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be between 3 and 100 characters')
    .escape(),
  
  body('company')
    .optional() // Company can come from user profile
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Company name must be between 2 and 100 characters')
    .escape(),
  
  body('location')
    .trim()
    .notEmpty().withMessage('Location is required')
    .isLength({ min: 2, max: 100 }).withMessage('Location must be between 2 and 100 characters')
    .escape(),
  
  body('type')
    .notEmpty().withMessage('Job type is required')
    .isIn(['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'])
    .withMessage('Invalid job type'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Job description is required')
    .isLength({ min: 50, max: 5000 }).withMessage('Description must be between 50 and 5000 characters')
    .escape(),
  
  body('requirements')
    .optional()
    .isArray().withMessage('Requirements must be an array')
    .custom((requirements) => {
      if (!Array.isArray(requirements)) return false;
      if (requirements.length > 20) return false;
      return requirements.every(req => 
        typeof req === 'string' && 
        req.length > 0 && 
        req.length <= 100
      );
    }).withMessage('Invalid requirements format (max 20 items, each max 100 chars)'),
  
  body('salary.min')
    .optional()
    .isInt({ min: 0, max: 10000000 }).withMessage('Minimum salary must be a valid number'),
  
  body('salary.max')
    .optional()
    .isInt({ min: 0, max: 10000000 }).withMessage('Maximum salary must be a valid number')
    .custom((max, { req }) => {
      if (req.body.salary?.min && max < req.body.salary.min) {
        return false;
      }
      return true;
    }).withMessage('Maximum salary must be greater than minimum salary'),
  
  body('salary.currency')
    .optional()
    .isIn(['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CNY'])
    .withMessage('Invalid currency code')
];

// Validation for job search/filter
export const validateJobSearch = [
  query('search')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Search term too long')
    .escape(),
  
  query('location')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Location search too long')
    .escape(),
  
  query('type')
    .optional()
    .isIn(['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'])
    .withMessage('Invalid job type filter'),
  
  query('page')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Invalid page number'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 }).withMessage('Invalid limit (max 50 items per page)')
];

// Validation for job ID parameter
export const validateJobId = [
  param('id')
    .notEmpty().withMessage('Job ID is required')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid job ID format')
];