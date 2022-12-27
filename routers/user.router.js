const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

const UserController = require('../controllers/user.controller');
const userController = new UserController();

//팔로잉하려는 유저의 id /follow 하면 팔로잉 추가
router.post(
  '/:followingId/follow',
  authMiddleware,
  userController.addfollowing,
);

//언팔로잉하려는 유저의 id /follow 하면 팔로잉 취소
router.post(
  '/:followingId/unfollow',
  authMiddleware,
  userController.unfollowing,
);

//유저의 팔로잉 조회
router.get('/:followerId/follow', authMiddleware, userController.following);
module.exports = router;
