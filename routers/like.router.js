const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const LikeController = require('../controllers/like.controller');
const likeController = new LikeController();

router.post('/post/:postId', likeController.likePost);

module.exports = router;
