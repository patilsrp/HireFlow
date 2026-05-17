import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';
import { validateRegister, validateLogin } from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.get('/me', protect, getMe);

export default router;