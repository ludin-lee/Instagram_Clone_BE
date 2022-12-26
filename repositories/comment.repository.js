const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
class CommentRepository {
  constructor(CommentsModel) {
    this.commentsModel = CommentsModel;
  }

  createComment = async (comment, user, postId) => {
    const createComment = await this.commentsModel.create({
      comment,
      userId: user.userId,
      postId,
    });
    return createComment;
  };

  findAllComment = async (postId) => {
    const findAllComment = await this.commentsModel.findAll({
      where: postId,
    });
    return findAllComment;
  };

  findPostComment = async (postId) => {
    const query = `SELECT commentId,postId,comment,Comments.createdAt,Comments.updatedAt,Users.nickname
    FROM Comments
    LEFT JOIN Users
    On Comments.userId = Users.userId
    WHERE Comments.postId = ${postId}`;
    const queryResult = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return queryResult;
  };

  findOneComment = async (commentId) => {
    const findOneComment = await this.commentsModel.findOne({
      where: { commentId },
    });
    return findOneComment;
  };

  updateComment = async (commentId, comment) => {
    const updateComment = await this.commentsModel.update(
      { comment },
      { where: { commentId } },
    );

    return updateComment;
  };

  deleteComment = async (commentId) => {
    const deleteComment = await this.commentsModel.destroy({
      where: { commentId },
    });
    return deleteComment;
  };
}

module.exports = CommentRepository;
