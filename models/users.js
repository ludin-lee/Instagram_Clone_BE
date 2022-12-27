'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.hasMany(models.Postlikes, { foreignKey: 'userId' });
      this.hasMany(models.Posts, { foreignKey: 'userId' });
      this.hasMany(models.Comments, { foreignKey: 'userId' });
      this.belongsToMany(models.Users, {
        foreignKey: 'followingId',
        as: 'Followers',
        through: 'Follow',
      });
      this.belongsToMany(models.Users, {
        foreignKey: 'followerId',
        as: 'Followings',
        through: 'Follow',
      });
    }
  }
  Users.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profileImg: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      },
      provider: {
        type: DataTypes.ENUM('local', 'facebook'),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Users',
    },
  );
  return Users;
};
