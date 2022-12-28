const passport = require('passport');
const local = require('./localStrategy');
const facebook = require('./facebookStrategy');
const Users = require('../models/users');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('serialize');
    done(null, user.id);
  });

  passport.deserializeUser((userId, done) => {
    console.log('deserialize');
    Users.findOne({
      where: { userId },
      include: [
        {
          model: Users,
          attributes: ['userId', 'nickname'],
          as: 'Followers',
        },
        {
          model: Users,
          attributes: ['userId', 'nickname'],
          as: 'Followings',
        },
      ],
    })
      .then((user) => {
        console.log('user', user);
        done(null, user);
      })
      .catch((err) => done(err));
  });

  local();
  facebook();
};
