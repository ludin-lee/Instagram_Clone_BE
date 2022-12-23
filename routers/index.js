const express = require('express');
const router = express.Router();

const authRouter = require('./auth.router');
const commentRouter = require('./comment.router');
const likeRouter = require('./like.router');
const postRouter = require('./post.router');

router.use('/auth', authRouter);
router.use('/comment', commentRouter);
router.use('/like', likeRouter);
router.use('/post', postRouter);
module.exports = router;
