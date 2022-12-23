const logger = require('../config/loggers');
const AuthService = require('../services/auth.service.js');
class AuthController {
  authService = new AuthService();

  //이메일 중복 체크
  checkId = async (req, res, next) => {
    try {
      const { email } = req.body;
      const checkId = await this.authService.checkId(email);
      console.log('controller checkId: ', checkId);
      return res
        .status(201)
        .json({ result: true, messeage: '이메일 중복 체크 성공' });
    } catch (error) {
      logger.error(error.message);
      return res
        .status(error.status || 500)
        .json({ result: false, message: error.message });
    }
  };
  //닉네임 중복 체크
  checkNickname = async (req, res, next) => {
    try {
      const { nickname } = req.body;
      const checkNickname = await this.authService.checkId(nickname);

      return res
        .status(201)
        .json({ result: true, messeage: '닉네임 중복 체크 성공' });
    } catch (error) {
      logger.error(error.message);
      return res
        .status(error.status || 500)
        .json({ result: false, message: error.message });
    }
  };
  //회원가입
  signup = async (req, res, next) => {
    try {
      const { email, nickname, password } = req.body;
      await this.authService.signup(email, nickname, password);

      return res.status(201).json({ result: true, messeage: '성공' });
    } catch (error) {
      logger.error(error.message);
      return res
        .status(error.status || 500)
        .json({ result: false, message: error.message });
    }
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
