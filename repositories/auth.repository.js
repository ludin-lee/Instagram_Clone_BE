const e = require('express');
const { Users } = require('../models');
class AuthRepository {
  constructor(UsersModel) {
    this.usersModel = UsersModel;
  }
  //이메일 중복 체크
  checkId = async (email) => {
    const emailVal = await this.usersModel.findOne({ where: { email } });
    return emailVal;
  };

  // 닉네임 중복 체크
  checkNickname = async (nickname) => {
    console.log('nickname: ', nickname);
    const nicknameVal = await this.usersModel.findOne({ where: { nickname } });

    return nicknameVal;
  };

  //회원가입
  signup = async (email, nickname, hashedPassword) => {
    const signupCreate = await this.usersModel.create({
      email,
      nickname,
      password: hashedPassword,
    });
    return signupCreate;
  };

  //로그인
  login = async (email) => {
    const loginVal = await this.usersModel.findOne({ where: { email } });
    return loginVal;
  };

  //토큰 인증
  findByUserId = async (userId) => {
    const isUser = await this.usersModel.findOne({ where: { userId } });
    return isUser;
  };
}

module.exports = AuthRepository;
