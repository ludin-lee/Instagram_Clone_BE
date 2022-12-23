'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Posts, { foreignKey: 'postId' });
    }
  }
  Comments.init(
    {
      commentId: {
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
      comment: {
        type: DataTypes.STRING,
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
      modelName: 'Comments',
    },
  );
  return Comments;
};
