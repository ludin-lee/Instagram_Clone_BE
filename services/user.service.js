const logger = require('../config/loggers');
const { NotFoundError } = require('../exceptions/index.exception');
const { Users, Follow } = require('../models');
const UserRepository = require('../repositories/user.repository');

class UserService {
  userRepository = new UserRepository(Users, Follow);

  addfollowing = async (userId, followingId) => {
    console.log('userId, followingId: ', userId, followingId);
    const findUser = await this.userRepository.findUser(userId);
    // console.log(findUser);
    if (findUser) {
      await findUser.addFollowings(parseInt(followingId));
      return true;
    } else {
      throw new NotFoundError('존재하지 않는 유저입니다');
    }
  };

  unfollowing = async (userId, followingId) => {
    const findUser = await this.userRepository.findUser(userId);
    if (findUser) {
      const unfollow = await findUser.removeFollowings(parseInt(followingId));
      return true;
    } else {
      throw new NotFoundError('존재하지 않는 유저입니다');
    }
  };
  following = async (userId, followerId) => {
    const findUser = await this.userRepository.findUser(userId);

    if (findUser) {
      const followList = await findUser.getFollowings({
        attributes: ['nickname'],
      });

      return followList;
    } else {
      throw new NotFoundError('존재하지 않는 유저입니다');
    }
  };
}
module.exports = UserService;
// exports.follow = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ where: { id: req.user.id } });
//     if (user) {
//       // req.user.id가 followerId, req.params.id가 followingId
//       await user.addFollowing(parseInt(req.params.id, 10));
//       res.send('success'
//     } else {
//       res.status(404).send('no user');
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
