const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const AuthRepository = require('../repositories/auth.repository');
const { Users } = require('../models');
const { check } = require('prettier');
const {
  AuthorizationError,
  ValidationError,
} = require('../exceptions/index.exception');

class AuthService {
  authRepository = new AuthRepository(Users);

  //중복 이메일 체크
  checkId = async (email) => {
    const checkId = await this.authRepository.checkId(email);
    console.log('service !checkId: ', !checkId);

    if (checkId) {
      throw new ValidationError('이미 사용중인 이메일 입니다.');
    } else {
      return true;
    }
  };

  //중복 닉네임 체크
  checkNickname = async (nickname) => {
    const nicknameVal = await this.authRepository.checkNickname(nickname);
    console.log('nicknameVal: ', nicknameVal);

    if (nicknameVal) {
      throw new ValidationError('이미 사용중인 닉네임 입니다.');
    } else {
      return true;
    }
  };

  //회원가입
  signup = async (email, nickname, password) => {
    const hashedPassword = await bcrypt.hash(password, 6);
    await this.authRepository.signup(email, nickname, hashedPassword);

    return true;
  };

  //로그인
  login = async (email, password) => {
    const loginVal = await this.authRepository.login(email, password);
    const checkPassword = await bcrypt.compare(password, loginVal.password);

    if (email !== loginVal.email || !checkPassword) {
      throw new ValidationError('이메일 또는 패스워드를 확인해주세요.');
    }
    const token = jwt.sign(
      {
        userId: loginVal.userId,
        email: loginVal.email,
        nickname: loginVal.nickname,
        profileImg: loginVal.profileImg,
      },
      SECRET_KEY,
      { expiresIn: '1hr' },
    );
    console.log('token:', token);
    return token;
  };

  //토큰 인증
  findTokenUser = async (user) => {
    const loginVal = await this.authRepository.findByUserId(user.userId);
    console.log('user.userId: ', user.userId);
    if (!loginVal) {
      throw new AuthorizationError('유저가 없습니다');
    }
    const data = {
      result: true,
      email: loginVal.email,
      nickname: loginVal.nickname,
      profileImg: loginVal.profileImg,
    };
    return data;
  };
}

module.exports = AuthService;
