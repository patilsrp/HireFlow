import { body } from 'express-validator';

// Validation rules for registration
export const validateRegister = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces')
    .escape(),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail()
    .toLowerCase(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/).withMessage('Password must contain at least one letter and one number'),
  
  body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['candidate', 'recruiter']).withMessage('Role must be either candidate or recruiter'),
  
  body('company')
    .if(body('role').equals('recruiter'))
    .trim()
    .notEmpty().withMessage('Company name is required for recruiters')
    .isLength({ min: 2, max: 100 }).withMessage('Company name must be between 2 and 100 characters')
    .escape(),
  
  body('skills')
    .optional()
    .isArray().withMessage('Skills must be an array')
    .custom((skills) => {
      if (skills.length > 20) return false;
      return skills.every(skill => typeof skill === 'string' && skill.length <= 50);
    }).withMessage('Invalid skills format or too many skills (max 20)'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters')
    .escape()
];

// Validation rules for login
export const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail()
    .toLowerCase(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
];