const { Users } = require('../models');

class UserRepository {
  constructor(UsersModel, FollowsModel) {
    this.usersModel = UsersModel;
    this.followsModel = FollowsModel;
  }

  findUser = async (userId) => {
    // console.log('userId: ', userId);
    return await this.usersModel.findOne({
      where: { userId },
      attributes: { exclude: ['password'] },
    });
  };

  //   addfollowing = async (userId, followingId) => {
  //     console.log('this.followModel: ', this.followsModel);
  //     const addfollowing = await this.followsModel.create({
  //       userId,
  //       followingId,
  //     });
  //     console.log(addfollowing);
  //     return addfollowing;
  //   };
}
module.exports = UserRepository;
