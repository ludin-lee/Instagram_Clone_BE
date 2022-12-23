'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Postlikes extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Posts, { foreignKey: 'postId' });
    }
  }
  Postlikes.init(
    {
      likeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', // Users 테이블에
          key: 'userId', // userId column 과 관계를 맺음
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Posts', 
          key: 'postId', 
        },
        onDelete: 'CASCADE',
        allowNull: false,
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
      modelName: 'Postlikes',
    },
  );
  return Postlikes;
};
