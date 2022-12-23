const bcrypt = require('bcryptjs');
const { loginRequestSchema } = require('../utils/auth.validation');
const jwt = require('jsonwebtoken');
const AuthRepository = require('../repositories/auth.repository');
const { Users } = require('../models');

class AuthService {
  authRepository = new AuthRepository(Users);

  checkId = async () => {};
  checkNickname = async () => {};
  signup = async () => {};
  login = async () => {};
}

module.exports = AuthService;
