const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

router.post('/signup', authMiddleware, authController.signup);
router.post('/signup/checkId', authMiddleware, authController.checkId);
router.post(
  '/auth/signup/checkNickname',
  authMiddleware,
  authController.checkNickname,
);
router.post('/auth/signup/login', authMiddleware, authController.login);

module.exports = router;
