// User roles
export const USER_ROLES = {
  CANDIDATE: 'candidate',
  RECRUITER: 'recruiter'
};

// Job types
export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Remote'
];

// Application statuses
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  SHORTLISTED: 'shortlisted',
  REJECTED: 'rejected',
  HIRED: 'hired'
};

// Currency codes
export const CURRENCY_CODES = [
  'USD',
  'EUR',
  'GBP',
  'INR',
  'JPY',
  'CNY'
];

// Validation limits
export const VALIDATION_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 50,
  EMAIL_MAX: 100,
  PASSWORD_MIN: 6,
  COMPANY_MIN: 2,
  COMPANY_MAX: 100,
  TITLE_MIN: 3,
  TITLE_MAX: 100,
  LOCATION_MIN: 2,
  LOCATION_MAX: 100,
  DESCRIPTION_MIN: 50,
  DESCRIPTION_MAX: 5000,
  BIO_MAX: 500,
  COVER_LETTER_MAX: 2000,
  SKILLS_MAX: 20,
  REQUIREMENTS_MAX: 20,
  SALARY_MIN: 0,
  SALARY_MAX: 10000000,
  PAGE_MAX: 100,
  LIMIT_MAX: 50
};

// Error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Not authorized',
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_EXISTS: 'Email already registered',
  USER_NOT_FOUND: 'User not found',
  JOB_NOT_FOUND: 'Job not found',
  APPLICATION_EXISTS: 'Already applied to this job',
  VALIDATION_FAILED: 'Validation failed',
  SERVER_ERROR: 'Server error occurred',
  RATE_LIMIT: 'Too many requests',
  INVALID_TOKEN: 'Invalid or expired token',
  ACCESS_DENIED: 'Access denied',
  INVALID_ID: 'Invalid ID format',
  ENTITY_TOO_LARGE: 'Request entity too large'
};