const bcrypt = require('bcryptjs');
const { loginRequestSchema } = require('../utils/auth.validation');
const jwt = require('jsonwebtoken');
const logger = require('../config/loggers');
const AuthService = require('../services/auth.service.js');
class AuthController {
  authService = new AuthService();

  //이메일 중복 체크
  checkId = async (req, res, next) => {
    try {
    } catch (error) {}
  };
  //닉네임 중복 체크
  checkNickname = async (req, res, next) => {
    try {
    } catch (error) {}
  };
  //회원가입
  signup = async (req, res, next) => {
    try {
    } catch (error) {}
  };
  //로그인
  login = async (req, res, next) => {
    try {
      const { username, password } = await loginRequestSchema.validateAsync(
        req.body,
      ); // body required검증

      const accessToken = await this.loginService.login(username, password); // 토큰 받아오기
      res.header('token', `Bearer ${accessToken}`);

      res.status(200).json({ message: '로그인에 성공했습니다.', accessToken });
    } catch (err) {
      logger.error(err.message);
      next(err);
    }
  };
}

module.exports = AuthController;
