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
        type: DataTypes.STRING,
        onDelete: 'CASECADE',
        allowNull: false,
      },
      postId: {
        type: DataTypes.STRING,
        onDelete: 'CASECADE',
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
