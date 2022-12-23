const bcrypt = require('bcryptjs');
// const { loginRequestSchema } = require('../utils/auth.validation');
const jwt = require('jsonwebtoken');
const AuthRepository = require('../repositories/auth.repository');
const { Users } = require('../models');
const { check } = require('prettier');
const {
  AuthorizationError,
  BadRequestError,
  InvalidParamsError,
  NotFoundError,
  ValidationError,
  DuplicateError,
} = require('../exceptions/index.exception');

class AuthService {
  authRepository = new AuthRepository(Users);

  checkId = async (email) => {
    const checkId = await this.authRepository.checkId(email);
    console.log('service !checkId: ', !checkId);

    if (checkId) {
      throw new ValidationError('이미 사용중인 이메일 입니다.');
    } else {
      return true;
    }
  };
  checkNickname = async (nickname) => {
    const nicknameVal = await this.authRepository.checkNickname(nickname);
    console.log('nicknameVal: ', nicknameVal);

    if (nicknameVal) {
      throw new ValidationError('이미 사용중인 닉네임 입니다.');
    } else {
      return true;
    }
  };
  signup = async (email, nickname, password) => {
    const hashedPassword = await bcrypt.hash(password, 6);
    await this.authRepository.signup(email, nickname, hashedPassword);

    return true;
  };
  login = async () => {};
}

module.exports = AuthService;
