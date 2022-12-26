const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const PostController = require('../controllers/post.controller');
const postController = new PostController();
const upload = require('../middlewares/awsS3PostMiddleware');

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  postController.createPost,
); //게시글 생성
router.get('/', postController.findAllPosts); //게시글 전체 조회
router.get('/:nickname', authMiddleware, postController.findProfilePosts); //프로필 화면 게시글 조회
router.get('/detail/:postId', authMiddleware, postController.findDetailPost); // 게시글 상세 조회
router.patch('/:postId', authMiddleware, postController.updatePost); //게시글 수정
router.delete('/:postId', authMiddleware, postController.deletePost); //게시글 삭제

module.exports = router;
