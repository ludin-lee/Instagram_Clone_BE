const logger = require('../config/loggers');
const UserService = require('../services/user.service.js');
class UserController {
  userService = new UserService();

  //팔로우 하기
  addfollowing = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { followingId } = req.params;
    try {
      const result = await this.userService.addfollowing(userId, followingId);
      return res.status(201).json({ result: result, message: '팔로잉 성공' });
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ result: false, message: error.message });
    }
  };
  //언팔로우 하기
  unfollowing = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { followingId } = req.params;
    console.log('cont followingId : ', followingId);
    try {
      const result = await this.userService.unfollowing(userId, followingId);
      return res.status(201).json({ result: result, message: '언팔로잉 성공' });
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ result: false, message: error.message });
    }
  };
  //팔로잉 조회
  following = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { followerId } = req.params;

    try {
      const result = await this.userService.following(userId, followerId);
      return res
        .status(201)
        .json({ result: result, message: '팔로잉 조회 성공' });
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ result: false, message: error.message });
    }
  };
  //팔로워 조회
  follower = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { followingId } = req.params;

    try {
      const result = await this.userService.follower(userId, followingId);
      return res
        .status(201)
        .json({ result: result, message: '팔로워 조회 성공' });
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ result: false, message: error.message });
    }
  };
  // 팔로워, 팔로잉 카운트
  count = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const result = await this.userService.count(userId);
      return res
        .status(201)
        .json({ result: result, message: '팔로워,팔로잉 카운트 성공' });
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ result: false, message: error.message });
    }
  };
}
module.exports = UserController;
