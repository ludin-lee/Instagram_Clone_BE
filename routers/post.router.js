const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const PostController = require('../controllers/post.controller');
const postController = new PostController();

router.post('/:itemId', authMiddleware, postController.createDiary);


module.exports = router;
