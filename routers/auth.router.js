const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

router.post('/signup', authController.signup);
router.post('/signup/checkId', authController.checkId);
router.post(
  '/signup/checkNickname',

  authController.checkNickname,
);
router.post('/login', authController.login);
router.get('/login/tokencheck', authMiddleware, authController.tokenCheck);

module.exports = router;
