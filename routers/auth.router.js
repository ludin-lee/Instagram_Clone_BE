const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();

router.post('/:itemId', authMiddleware, authController.create);


module.exports = router;
