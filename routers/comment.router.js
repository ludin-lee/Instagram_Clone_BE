const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const CommentController = require('../controllers/comment.controller');
const commentController = new CommentController();

router.post('/:itemId', authMiddleware, commentController.createComment);
router.patch('/:commentId', authMiddleware, commentController.updateComment);
router.delete('/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;
