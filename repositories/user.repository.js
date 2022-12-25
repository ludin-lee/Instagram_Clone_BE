const { Users } = require('../models');

class UserRepository {
  findUser = async (userId) => {
    return await Users.findOne({
      where: { userId },
      attributes: { exclude: ['password'] },
    });
  };
}
module.exports = UserRepository;
