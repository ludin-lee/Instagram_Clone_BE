const e = require('express');
const { Users } = require('../models');
class AuthRepository {
  constructor(UsersModel) {
    this.usersModel = UsersModel;
  }
  checkId = async (email) => {
    const emailVal = await Users.findOne({ where: { email } });
    return emailVal;
  };

  checkNickname = async (nickname) => {
    const nicknameVal = await Users.findOne({ where: { nickname } });
    return nicknameVal;
  };
  signup = async (email, nickname, hashedPassword) => {
    const signupCreate = await Users.create({
      email,
      nickname,
      password: hashedPassword,
    });
    return signupCreate;
  };
}

module.exports = AuthRepository;
