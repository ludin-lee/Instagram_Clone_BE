const logger = require('../config/loggers');
const UserService = require('../services/user.service.js');
class UserController {
  userService = new UserService();

  /**팔로잉 추가하기
   * req.userId가 followerId
   * req.params 의 userId가 followingId
   */
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
}
module.exports = UserController;
